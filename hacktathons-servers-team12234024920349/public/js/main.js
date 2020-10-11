import $els from "./elements.js";

import {
  addIngredient,
  handleSubmit,
  onControlAction,
  getRecipesHandler,
  onAddNewRecipe,
  onCancelRecipeSubmission,
} from "./handlers.js";

$els.ingredientButton.addEventListener("click", addIngredient);
$els.submitButton.addEventListener("click", handleSubmit);
$els.getRecipeButton.addEventListener("click", getRecipesHandler);
$els.ingredientsList.addEventListener("click", onControlAction); // delegated
$els.addNewRecipeButton.addEventListener("click", onAddNewRecipe);
$els.cancelNewRecipeButton.addEventListener("click", onCancelRecipeSubmission);

getRecipesHandler();
