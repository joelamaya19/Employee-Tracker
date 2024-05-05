const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
