const { Pool } = require('pg');

const pool = new Pool({
  user: 'danielkim520',
  host: 'localhost',
  port: 5432,
  database: "test"
})

module.exports = pool;