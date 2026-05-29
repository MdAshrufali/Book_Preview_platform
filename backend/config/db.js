const mysql = require('mysql2/promise');

const actionableEnv = (name, fallback) => {
  const v = process.env[name];
  if (v === undefined || v === '') return fallback;
  return v;
};


const pool = mysql.createPool({
  host: actionableEnv('DB_HOST', 'localhost'),
  port: actionableEnv('DB_PORT', 3306),
  user: actionableEnv('DB_USER', 'root'),
  password: actionableEnv('DB_PASSWORD', ''),
  database: actionableEnv('DB_NAME', ''),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  const [rows] = await pool.query('SELECT 1 AS ok');
  return rows;
}

module.exports = { pool, testConnection };

