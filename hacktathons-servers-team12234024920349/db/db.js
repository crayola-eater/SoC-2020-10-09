const { query } = require("./index");

// Should add single recipe to DB table.
const addRecipe = async ({ title, ingredients, instructions, image }) =>
  await query(
    `INSERT INTO recipes (title, ingredients, instructions, image)
    VALUES ($1, $2, $3, $4) RETURNING *;`,
    [title, ingredients, instructions, image]
  );

// Should add many recipes to DB table.
const addRecipes = async (recipes) => {
  if (!Array.isArray(recipes)) {
    throw new Error(`Expected array ${recipes}`);
  }
  let response;
  for (const recipe of recipes) {
    response = await addRecipe(recipe);
  }
  return response;
};

// Should get all recipes from DB table.
const getAllRecipes = async () => await query("SELECT * FROM recipes");

module.exports = {
  getAllRecipes,
  addRecipes,
  addRecipe,
};
