import mysql from 'mysql2/promise';
import { logger } from '../utils/logger';

const dbConfig = {
  host: process.env.RDS_ENDPOINT || 'localhost',
  port: parseInt(process.env.RDS_PORT || '3306'),
  user: process.env.RDS_USERNAME || 'admin',
  password: process.env.RDS_PASSWORD || 'password',
  database: process.env.RDS_DATABASE || 'cost_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;

export const databaseService = {
  async getConnection() {
    if (!pool) {
      pool = mysql.createPool(dbConfig);
      logger.info('Database connection pool created');
    }
    return pool;
  },

  async query(sql: string, params?: any[]) {
    try {
      const connection = await this.getConnection();
      const [rows] = await connection.execute(sql, params);
      return rows;
    } catch (error) {
      logger.error('Database query error', { error, sql, params });
      throw error;
    }
  },

  async close() {
    if (pool) {
      await pool.end();
      pool = null;
      logger.info('Database connection pool closed');
    }
  },
};
