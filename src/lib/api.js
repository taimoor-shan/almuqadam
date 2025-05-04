import slugify from 'slugify';
import { SHORTCUTS } from './constants';
import { nanoid } from '$lib/util';
import { ADMIN_PASSWORD } from '$env/static/private';
import { Blob } from 'node:buffer';
import { query, queryOne, queryMany, transaction } from '$lib/db';


/**
 * Creates a new article
 */
export async function createArticle(title, content, teaser, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  let slug = slugify(title, {
    lower: true,
    strict: true
  });

  // If slug is already used, we add a unique postfix
  const articleExists = await queryOne('SELECT slug FROM articles WHERE slug = $1', [slug]);
  if (articleExists) {
    slug = slug + '-' + nanoid();
  }

  const result = await query(
    `INSERT INTO articles (slug, title, content, teaser, published_at)
     VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)
     RETURNING slug, created_at`,
    [slug, title, content, teaser]
  );

  return result.rows[0];
}

/**
 * We automatically extract a teaser text from the document's content.
 */
export async function updateArticle(slug, title, content, teaser, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  const result = await query(
    `UPDATE articles
     SET title = $1, content = $2, teaser = $3, updated_at = CURRENT_TIMESTAMP
     WHERE slug = $4
     RETURNING slug, updated_at`,
    [title, content, teaser, slug]
  );

  return result.rows[0];
}

/*
  This can be replaced with any user-based authentication system
*/
export async function authenticate(password, sessionTimeout) {
  if (password === ADMIN_PASSWORD) {
    const sessionId = nanoid();
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + sessionTimeout);

    // Now is a good time to remove expired sessions
    await query('DELETE FROM sessions WHERE expires < $1', [new Date().toISOString()]);

    // Create a new session
    await query(
      'INSERT INTO sessions (session_id, expires) VALUES($1, $2) RETURNING session_id',
      [sessionId, expires.toISOString()]
    );

    return { sessionId };
  } else {
    throw 'Authentication failed.';
  }
}

/*
  Log out of the admin session ...
*/
export async function destroySession(sessionId) {
  await query('DELETE FROM sessions WHERE session_id = $1', [sessionId]);
  return true;
}

/**
 * List all available articles (newest first)
 */
export async function getArticles(currentUser) {
  if (currentUser) {
    // When logged in, show both drafts and published articles
    return await queryMany(
      `SELECT *, COALESCE(published_at, updated_at, created_at) AS modified_at
       FROM articles
       ORDER BY modified_at DESC`
    );
  } else {
    return await queryMany(
      `SELECT * FROM articles
       WHERE published_at IS NOT NULL
       ORDER BY published_at DESC`
    );
  }
}

/**
 * Given a slug, determine article to "read next"
 */
export async function getNextArticle(slug) {
  const result = await queryOne(`
    WITH previous_published AS (
      SELECT
        title,
        teaser,
        slug,
        published_at
      FROM articles
      WHERE
        published_at < (SELECT published_at FROM articles WHERE slug = $1)
      ORDER BY published_at DESC
      LIMIT 1
    ),
    latest_article AS (
      SELECT
        title,
        teaser,
        slug,
        published_at
      FROM articles
      WHERE slug <> $1
      ORDER BY published_at DESC
      LIMIT 1
    )
    SELECT title, teaser, slug, published_at
    FROM (
      SELECT * FROM previous_published
      UNION
      SELECT * FROM latest_article
    )
    ORDER BY published_at ASC
    LIMIT 1;
  `, [slug]);

  return result;
}

/**
 * Search within all searchable items (including articles and website sections)
 */
export async function search(q, currentUser) {
  let results;

  if (currentUser) {
    results = await queryMany(
      `SELECT title AS name, '/blog/' || slug AS url, COALESCE(published_at, updated_at, created_at) AS modified_at
       FROM articles
       WHERE title ILIKE $1
       ORDER BY modified_at DESC`,
      [`%${q}%`]
    );
  } else {
    results = await queryMany(
      `SELECT title AS name, '/blog/' || slug AS url, COALESCE(published_at, updated_at, created_at) AS modified_at
       FROM articles
       WHERE title ILIKE $1 AND published_at IS NOT NULL
       ORDER BY modified_at DESC`,
      [`%${q}%`]
    );
  }

  // Also include predefined shortcuts in search
  SHORTCUTS.forEach(shortcut => {
    if (shortcut.name.toLowerCase().includes(q.toLowerCase())) {
      results.push(shortcut);
    }
  });

  return results;
}

/**
 * Retrieve article based on a given slug
 */
export async function getArticleBySlug(slug) {
  return await queryOne('SELECT * FROM articles WHERE slug = $1', [slug]);
}

/**
 * Remove the entire article
 */
export async function deleteArticle(slug, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  const result = await query('DELETE FROM articles WHERE slug = $1', [slug]);
  return result.rowCount > 0;
}

/**
 * In this minimal setup there is only one user, the website admin.
 * If you want to support multiple users/authors you want to return the current user record here.
 */
export async function getCurrentUser(session_id) {
  if (!session_id) return null;

  const session = await queryOne(
    'SELECT session_id, expires FROM sessions WHERE session_id = $1 AND expires > $2',
    [session_id, new Date().toISOString()]
  );

  if (session) {
    return { name: 'Admin' };
  } else {
    return null;
  }
}


/**
 * Update the page
 */
export async function createOrUpdatePage(page_id, page, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  // For PostgreSQL, we can pass the object directly for JSONB columns
  // No need to stringify as the pg driver will handle it
  const pageData = page;

  const pageExists = await queryOne('SELECT page_id FROM pages WHERE page_id = $1', [page_id]);

  if (pageExists) {
    const result = await query(
      'UPDATE pages SET data = $1, updated_at = $2 WHERE page_id = $3 RETURNING page_id',
      [pageData, new Date().toISOString(), page_id]
    );
    return result.rows[0];
  } else {
    const result = await query(
      'INSERT INTO pages (page_id, data, updated_at) VALUES($1, $2, $3) RETURNING page_id',
      [page_id, pageData, new Date().toISOString()]
    );
    return result.rows[0];
  }
}

/**
 * E.g. getPage("home") gets all dynamic data for the home page
 */
export async function getPage(page_id) {
  const page = await queryOne('SELECT data FROM pages WHERE page_id = $1', [page_id]);
  if (page?.data) {
    // Check if data is already an object (PostgreSQL JSONB) or a string (needs parsing)
    if (typeof page.data === 'object') {
      return page.data;
    } else {
      try {
        return JSON.parse(page.data);
      } catch (error) {
        console.error(`Error parsing JSON for page ${page_id}:`, error);
        console.log('Data type:', typeof page.data);
        console.log('Data value:', page.data);
        return null;
      }
    }
  } else {
    return null;
  }
}

/**
 * We can count all kinds of things with this.
 */
export async function createOrUpdateCounter(counter_id) {
  return await transaction(async (client) => {
    const counter_exists = await client.query(
      'SELECT counter_id FROM counters WHERE counter_id = $1',
      [counter_id]
    );

    if (counter_exists.rows.length > 0) {
      const result = await client.query(
        'UPDATE counters SET count = count + 1 WHERE counter_id = $1 RETURNING count',
        [counter_id]
      );
      return result.rows[0];
    } else {
      const result = await client.query(
        'INSERT INTO counters (counter_id, count) VALUES($1, 1) RETURNING count',
        [counter_id]
      );
      return result.rows[0];
    }
  });
}

// asset_id is a string and has the form path
export async function storeAsset(asset_id, file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await query(
    `INSERT INTO assets (asset_id, mime_type, updated_at, size, data)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (asset_id) DO UPDATE
     SET mime_type = EXCLUDED.mime_type,
         updated_at = EXCLUDED.updated_at,
         size = EXCLUDED.size,
         data = EXCLUDED.data`,
    [asset_id, file.type, new Date().toISOString(), file.size, buffer]
  );
}

export async function getAsset(asset_id) {
  const row = await queryOne(
    `SELECT asset_id, mime_type, updated_at, size, data
     FROM assets
     WHERE asset_id = $1`,
    [asset_id]
  );

  if (!row) return null;

  return {
    filename: row.asset_id.split('/').slice(-1),
    mimeType: row.mime_type,
    lastModified: row.updated_at,
    size: row.size,
    data: new Blob([row.data], { type: row.mime_type })
  };
}
