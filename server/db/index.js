const pg = require('pg')

const db = new pg.Pool({
  database: process.env.DB_NAME || 'trippello'
})

module.exports = db