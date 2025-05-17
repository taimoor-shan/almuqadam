import slugify from "slugify";
import { S as SHORTCUTS } from "./constants.js";
import { n as nanoid } from "./util.js";
import { q as query, a as queryOne, t as transaction, b as queryMany, A as ADMIN_PASSWORD } from "./db.js";
import { Blob } from "node:buffer";
async function storeAssetInDatabase(asset_id, file) {
  try {
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
      [asset_id, file.type, (/* @__PURE__ */ new Date()).toISOString(), file.size, buffer]
    );
    console.log(`Asset ${asset_id} stored successfully (${file.size} bytes)`);
  } catch (error) {
    console.error("Error storing asset in database:", error);
    throw new Error(`Failed to store asset: ${error.message}`);
  }
}
async function getAssetFromDatabase(asset_id) {
  try {
    const row = await queryOne(
      `SELECT asset_id, mime_type, updated_at, size, data
       FROM assets
       WHERE asset_id = $1`,
      [asset_id]
    );
    if (!row) return null;
    return {
      filename: row.asset_id.split("/").slice(-1)[0],
      mimeType: row.mime_type,
      lastModified: row.updated_at,
      size: row.size,
      data: new Blob([row.data], { type: row.mime_type })
    };
  } catch (error) {
    console.error("Error retrieving asset from database:", error);
    return null;
  }
}
async function deleteAssetFromDatabase(asset_id) {
  try {
    const result = await query(
      "DELETE FROM assets WHERE asset_id = $1",
      [asset_id]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting asset from database:", error);
    return false;
  }
}
async function listAssets() {
  try {
    const result = await query(
      `SELECT asset_id, mime_type, updated_at, size
       FROM assets
       ORDER BY updated_at DESC`
    );
    return result.rows;
  } catch (error) {
    console.error("Error listing assets:", error);
    return [];
  }
}
async function createArticle(title, content, teaser, currentUser) {
  if (!currentUser) throw new Error("Not authorized");
  let slug = slugify(title, {
    lower: true,
    strict: true
  });
  const articleExists = await queryOne("SELECT slug FROM articles WHERE slug = $1", [slug]);
  if (articleExists) {
    slug = slug + "-" + nanoid();
  }
  const result = await query(
    `INSERT INTO articles (slug, title, content, teaser, published_at)
     VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP)
     RETURNING slug, created_at`,
    [slug, title, content, teaser]
  );
  return result.rows[0];
}
async function updateArticle(slug, title, content, teaser, currentUser) {
  if (!currentUser) throw new Error("Not authorized");
  const result = await query(
    `UPDATE articles
     SET title = $1, content = $2, teaser = $3, updated_at = CURRENT_TIMESTAMP
     WHERE slug = $4
     RETURNING slug, updated_at`,
    [title, content, teaser, slug]
  );
  return result.rows[0];
}
async function authenticate(password, sessionTimeout) {
  if (password === ADMIN_PASSWORD) {
    const sessionId = nanoid();
    const expires = /* @__PURE__ */ new Date();
    expires.setMinutes(expires.getMinutes() + sessionTimeout);
    await query("DELETE FROM sessions WHERE expires < $1", [(/* @__PURE__ */ new Date()).toISOString()]);
    await query(
      "INSERT INTO sessions (session_id, expires) VALUES($1, $2) RETURNING session_id",
      [sessionId, expires.toISOString()]
    );
    return { sessionId };
  } else {
    throw "Authentication failed.";
  }
}
async function destroySession(sessionId) {
  await query("DELETE FROM sessions WHERE session_id = $1", [sessionId]);
  return true;
}
async function getArticles(currentUser) {
  if (currentUser) {
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
async function getNextArticle(slug) {
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
    ) AS combined_results
    ORDER BY published_at ASC
    LIMIT 1;
  `, [slug]);
  return result;
}
async function search(q, currentUser) {
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
  SHORTCUTS.forEach((shortcut) => {
    if (shortcut.name.toLowerCase().includes(q.toLowerCase())) {
      results.push(shortcut);
    }
  });
  return results;
}
async function getArticleBySlug(slug) {
  return await queryOne("SELECT * FROM articles WHERE slug = $1", [slug]);
}
async function deleteArticle(slug, currentUser) {
  if (!currentUser) throw new Error("Not authorized");
  const result = await query("DELETE FROM articles WHERE slug = $1", [slug]);
  return result.rowCount > 0;
}
async function getCurrentUser(session_id) {
  if (!session_id) return null;
  const session = await queryOne(
    "SELECT session_id, expires FROM sessions WHERE session_id = $1 AND expires > $2",
    [session_id, (/* @__PURE__ */ new Date()).toISOString()]
  );
  if (session) {
    return { name: "Admin" };
  } else {
    return null;
  }
}
async function createOrUpdatePage(page_id, page, currentUser) {
  if (!currentUser) throw new Error("Not authorized");
  const pageData = page;
  const pageExists = await queryOne("SELECT page_id FROM pages WHERE page_id = $1", [page_id]);
  if (pageExists) {
    const result = await query(
      "UPDATE pages SET data = $1, updated_at = $2 WHERE page_id = $3 RETURNING page_id",
      [pageData, (/* @__PURE__ */ new Date()).toISOString(), page_id]
    );
    return result.rows[0];
  } else {
    const result = await query(
      "INSERT INTO pages (page_id, data, updated_at) VALUES($1, $2, $3) RETURNING page_id",
      [page_id, pageData, (/* @__PURE__ */ new Date()).toISOString()]
    );
    return result.rows[0];
  }
}
async function getPage(page_id) {
  const page = await queryOne("SELECT data FROM pages WHERE page_id = $1", [page_id]);
  console.log(`getPage(${page_id}) result:`, page);
  if (page?.data) {
    if (typeof page.data === "object") {
      return JSON.parse(JSON.stringify(page.data));
    } else {
      try {
        return JSON.parse(page.data);
      } catch (error) {
        console.error(`Error parsing JSON for page ${page_id}:`, error);
        console.log("Data type:", typeof page.data);
        console.log("Data value:", page.data);
        return null;
      }
    }
  } else {
    return null;
  }
}
async function createOrUpdateCounter(counter_id) {
  return await transaction(async (client) => {
    const counter_exists = await client.query(
      "SELECT counter_id FROM counters WHERE counter_id = $1",
      [counter_id]
    );
    if (counter_exists.rows.length > 0) {
      const result = await client.query(
        "UPDATE counters SET count = count + 1 WHERE counter_id = $1 RETURNING count",
        [counter_id]
      );
      return result.rows[0];
    } else {
      const result = await client.query(
        "INSERT INTO counters (counter_id, count) VALUES($1, 1) RETURNING count",
        [counter_id]
      );
      return result.rows[0];
    }
  });
}
async function storeAsset(asset_id, file) {
  return await storeAssetInDatabase(asset_id, file);
}
async function getAsset(asset_id) {
  return await getAssetFromDatabase(asset_id);
}
async function deleteAsset(asset_id, currentUser) {
  if (!currentUser) throw new Error("Not authorized");
  return await deleteAssetFromDatabase(asset_id);
}
async function getAllAssets(currentUser) {
  if (!currentUser) throw new Error("Not authorized");
  return await listAssets();
}
async function createCountry(title, content, teaser, featured_image, flag, currentUser) {
  if (!currentUser) throw new Error("Not authorized");
  let slug = slugify(title, {
    lower: true,
    strict: true
  });
  const countryExists = await queryOne("SELECT slug FROM countries WHERE slug = $1", [slug]);
  if (countryExists) {
    slug = slug + "-" + nanoid();
  }
  const result = await query(
    `INSERT INTO countries (slug, title, content, teaser, featured_image, flag, published_at)
     VALUES($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
     RETURNING slug, created_at`,
    [slug, title, content, teaser, featured_image, flag]
  );
  return result.rows[0];
}
async function updateCountry(slug, title, content, teaser, featured_image, flag, currentUser) {
  if (!currentUser) throw new Error("Not authorized");
  let newSlug = slugify(title, {
    lower: true,
    strict: true
  });
  if (newSlug !== slug) {
    const slugExists = await queryOne("SELECT slug FROM countries WHERE slug = $1", [newSlug]);
    if (slugExists) {
      newSlug = newSlug + "-" + nanoid();
    }
    const result = await query(
      `UPDATE countries
       SET title = $1, content = $2, teaser = $3, featured_image = $4, flag = $5, slug = $6, updated_at = CURRENT_TIMESTAMP
       WHERE slug = $7
       RETURNING slug, updated_at`,
      [title, content, teaser, featured_image, flag, newSlug, slug]
    );
    return result.rows[0];
  } else {
    const result = await query(
      `UPDATE countries
       SET title = $1, content = $2, teaser = $3, featured_image = $4, flag = $5, updated_at = CURRENT_TIMESTAMP
       WHERE slug = $6
       RETURNING slug, updated_at`,
      [title, content, teaser, featured_image, flag, slug]
    );
    return result.rows[0];
  }
}
async function getCountries(currentUser) {
  if (currentUser) {
    return await queryMany(
      `SELECT *, COALESCE(published_at, updated_at, created_at) AS modified_at
       FROM countries
       ORDER BY modified_at DESC`
    );
  } else {
    return await queryMany(
      `SELECT * FROM countries
       WHERE published_at IS NOT NULL
       ORDER BY published_at DESC`
    );
  }
}
async function getCountryBySlug(slug) {
  return await queryOne("SELECT * FROM countries WHERE slug = $1", [slug]);
}
async function deleteCountry(slug, currentUser) {
  if (!currentUser) throw new Error("Not authorized");
  const result = await query("DELETE FROM countries WHERE slug = $1", [slug]);
  return result.rowCount > 0;
}
export {
  createArticle as a,
  createCountry as b,
  createOrUpdateCounter as c,
  deleteAsset as d,
  deleteArticle as e,
  deleteCountry as f,
  getAllAssets as g,
  createOrUpdatePage as h,
  updateCountry as i,
  storeAsset as j,
  getAsset as k,
  getArticles as l,
  getPage as m,
  getArticleBySlug as n,
  getNextArticle as o,
  getCountries as p,
  getCountryBySlug as q,
  authenticate as r,
  search as s,
  destroySession as t,
  updateArticle as u,
  getCurrentUser as v
};
