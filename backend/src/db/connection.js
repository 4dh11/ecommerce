// backend/src/db/connection.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✓ MySQL connection pool initialized');
    connection.release();
  })
  .catch(error => {
    console.error('✗ MySQL connection error:', error.message);
  });

module.exports = pool;