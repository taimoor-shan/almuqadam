import pg from "pg";
const DATABASE_URL = "postgres://taimoor:Qwerty%40007@localhost:5432/editable_website";
const ADMIN_PASSWORD = "Qwerty@007";
const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});
console.log(`Connecting to PostgreSQL database: ${DATABASE_URL.replace(/:[^:]*@/, ":****@")}`);
pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});
pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  process.exit(-1);
});
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log("Checking if database tables exist...");
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'sessions'
      );
    `);
    if (!tableCheck.rows[0].exists) {
      console.log("Creating database tables...");
      await client.query(`
        CREATE TABLE IF NOT EXISTS sessions (
          session_id TEXT PRIMARY KEY,
          expires TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS pages (
          page_id TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS counters (
          counter_id TEXT PRIMARY KEY,
          count INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS assets (
          asset_id TEXT PRIMARY KEY,
          mime_type TEXT NOT NULL,
          updated_at TIMESTAMP DEFAULT NULL,
          size INTEGER NOT NULL,
          data BYTEA NOT NULL
        );

        CREATE TABLE IF NOT EXISTS articles (
          article_id SERIAL PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          teaser TEXT NOT NULL,
          content TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          published_at TIMESTAMP,
          updated_at TIMESTAMP
        );
      `);
      console.log("Database tables created successfully");
    } else {
      console.log("Database tables already exist");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    client.release();
  }
}
initializeDatabase().catch(console.error);
async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Error executing query", { text, error });
    throw error;
  }
}
async function queryOne(text, params) {
  const res = await query(text, params);
  return res.rows[0];
}
async function queryMany(text, params) {
  const res = await query(text, params);
  return res.rows;
}
async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
export {
  ADMIN_PASSWORD as A,
  queryOne as a,
  queryMany as b,
  query as q,
  transaction as t
};
