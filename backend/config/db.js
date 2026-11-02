const mysql = require('mysql2/promise');
const logger = require('./logger');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hospital_management_db',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  timezone: '+00:00'
});


async function testConnection() {
  try {
    const connection = await pool.getConnection();
    logger.info('MySQL Connection Pool successfully established to database: %s', process.env.DB_NAME);
    connection.release();
    return true;
  } catch (error) {
    logger.error('MySQL Connection Error: Failed to connect to MySQL server (%s). Ensure MySQL is running and %s database exists.', error.message, process.env.DB_NAME);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};
