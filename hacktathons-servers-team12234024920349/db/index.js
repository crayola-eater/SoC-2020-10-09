const { Pool } = require("pg");

const config = require("dotenv").config();

if (config.error) {
  throw config.error;
}

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports.query = pool.query.bind(pool);
