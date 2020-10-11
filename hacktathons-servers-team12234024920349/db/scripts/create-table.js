const { query } = require("../index");

// Should create a table (if there isn't already one)
const maybeCreateTable = async () => {
  return await query(
    `CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      ingredients TEXT[] NOT NULL,
      instructions TEXT NOT NULL,
      image TEXT NOT NULL
    );`
  );
};

module.exports = {
  maybeCreateTable,
};

if (require.main === module) {
  maybeCreateTable();
}
