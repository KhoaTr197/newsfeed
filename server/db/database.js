const mysql = require("mysql2/promise");
require("dotenv").config();
// --------------------------------------

const connection = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'newsfeed',
  password: process.env.DB_PASSWORD || 'root',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  charset: 'utf8mb4',
});

module.exports = connection;