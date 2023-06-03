const { Pool } = require("pg");

const db = new Pool({
  database: "trippello",
  password: "password",
});

module.exports = db;
