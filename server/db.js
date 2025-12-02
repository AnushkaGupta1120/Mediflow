import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Environment-driven DB configuration (set these in your environment or .env file)
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'inventory_db';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

let pool;

async function createPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_CONN_LIMIT || 10),
      queueLimit: 0,
    });

    try {
      const conn = await pool.getConnection();
      await conn.ping();
      conn.release();
      console.log('✅ Connected to MySQL database.');
    } catch (err) {
      console.error('❌ MySQL connection test failed:', err?.message || err);
      // allow server to start; queries will show clearer errors
    }
  }
  return pool;
}

export default createPool();
