const { query } = require("../index");

// Should delete the table (if there is one).
const maybeDeleteTable = async () => {
  return await query("DROP TABLE IF EXISTS recipes;");
};

module.exports = {
  maybeDeleteTable,
};

if (require.main === module) {
  maybeDeleteTable();
}
