import $els from "../elements.js";

export const createRecipe = async (recipeData) => {
  // Should add new recipe to DB.
  return await fetch("api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData),
  });
};

export const getRecipes = async () => {
  // Should get all recipes from DB.
  const response = await fetch("api/recipes");
  const { payload } = await response.json();
  return payload;
};

export const renderRecipes = (recipes) => {
  // Should render all given recipes.
  $els.recipesSection.innerHTML = "";
  $els.recipesSection.append(...recipes.map(createRecipeView));
};

export const getAndRenderRecipes = async () => {
  // Should get and render all recipes.
  const recipes = await getRecipes();
  renderRecipes(recipes);
};

const createRecipeView = ({ title, ingredients, instructions, image }) => {
  const article = document.createElement("article");
  article.classList.add("recipe");

  const h2 = document.createElement("h2");
  h2.innerText = title;
  h2.classList.add("recipe__name");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("recipe__image-container");

  const img = document.createElement("img");
  img.classList.add("recipe__image");
  img.src = image;
  img.alt = title;

  imageContainer.appendChild(img);

  const ingredientsHeading = document.createElement("h3");
  ingredientsHeading.classList.add("recipe__ingredients-heading");
  ingredientsHeading.textContent = "Ingredients";

  const ingredientsList = createIngredientsListView(ingredients);
  ingredientsList.classList.add("recipe__ingredients");

  const instructionsHeading = document.createElement("h3");
  instructionsHeading.classList.add("recipe__instructions-heading");
  instructionsHeading.textContent = "Instructions";

  const instructionsEl = document.createElement("p");
  instructionsEl.innerText = instructions;
  instructionsEl.classList.add("recipe__instructions");

  article.append(
    h2,
    imageContainer,
    ingredientsHeading,
    ingredientsList,
    instructionsHeading,
    instructionsEl
  );

  return article;
};

function createIngredientsListView(ingredients) {
  const ul = document.createElement("ul");
  ul.append(...ingredients.map(createIngredientView));
  return ul;
}

function createIngredientView(ingredient) {
  const li = document.createElement("li");
  li.textContent = ingredient;
  return li;
}
