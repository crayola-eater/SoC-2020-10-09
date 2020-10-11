const { maybeDeleteTable } = require("./drop-table");
const { maybeCreateTable } = require("./create-table");
const { addSeedData } = require("./populate-table");

const reinitialiseTable = async () => {
  await maybeDeleteTable();
  await maybeCreateTable();
  await addSeedData();
};

if (require.main === module) {
  reinitialiseTable();
}
