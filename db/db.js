// Import required libraries
const { Pool } = require('pg'); // PostgreSQL client library
const dotenv = require('dotenv'); 

dotenv.config();

// Create a new connection to pool using the Pool constructor from pg
const pool = new Pool({
  // Database connection configurations using env
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Export an object with a method 'query' which executes SQL queries using the connection pool 
module.exports = {
  query: (text, params) => pool.query(text, params),
};
