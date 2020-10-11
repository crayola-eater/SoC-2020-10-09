// TODO: All code (in nearly every module) is a massive mess. Tidy up and restructure when there's time.

import $els from "./elements.js";
import { createIngredientElement } from "./ingredient/ingredient.js";
import { ingredientControls } from "./ingredient/ingredientControls.js";
import { createRecipe, getAndRenderRecipes } from "./recipe/recipes.js";

export const addIngredient = (e) => {
  // Handler for "add new ingredient" button
  // (when adding a new recipe).
  e.preventDefault();
  const value = $els.ingredientsInput.value.trim();
  if (value.length === 0) {
    return;
  }
  const el = createIngredientElement(value);

  $els.ingredientsInput.value = "";
  $els.ingredientsList.appendChild(el);
};

export const onControlAction = (e) => {
  // Handler for any "ingredient control" button
  // (when adding a new recipe).
  const {
    target,
    target: {
      dataset: { action },
    },
  } = e;

  if (!target.classList.contains("control")) {
    return;
  }

  e.preventDefault();

  const control = ingredientControls.find(({ name }) => name === action);
  if (undefined === control) {
    throw new Error(`Unexpected action ${action}`);
  }
  control.handler(e.target);
};

export const onCancelRecipeSubmission = (e) => {
  $els.addRecipeScreen.style.display = "none";
  $els.mainScreen.style.display = "initial";
};

export const handleSubmit = async (e) => {
  // Handler for when user submits recipe
  // (when adding a new recipe).
  e.preventDefault();

  const {
    meta: { isValid, errors },
    data: formData,
  } = await gatherFormData();

  // TODO: alert is used a great deal below.
  // Use other means (instead of alert) to notify the user.
  if (!isValid) {
    return alert(errors[0]);
  }

  const response = await createRecipe(formData);
  alert(
    response.ok
      ? "Recipe added successfully, thanks for contributing!"
      : "Sorry, an error occurred. Please try again later."
  );

  $els.addRecipeScreen.style.display = "none";
  $els.mainScreen.style.display = "initial";
  await getAndRenderRecipes();
};

const gatherFormData = async () => {
  // Should return an object
  const form = document.querySelector("#create");
  const data = {
    ingredients: [],
    title: null,
    image: null,
    instructions: null,
  };

  for (const [name, value] of new FormData(form)) {
    if (name === "ingredients") {
      data[name] || (data[name] = []);
      data[name].push(value);
      continue;
    }
    if (
      !Reflect.defineProperty(data, name, {
        writable: false,
        configurable: false,
        enumerable: true,
        value,
      })
    ) {
      throw new Error(
        `Failed to define property ${name}. Unexpected duplicate field?`
      );
    }
  }

  Object.values(data).forEach((v) => {
    if (v === null) {
      throw new Error(`Expected form to contain image URL = ${data.image}`);
    }
  });

  const imageIsValid = await new Promise((resolve) => {
    const img = document.createElement("img");
    img.addEventListener("load", () => resolve(true));
    img.addEventListener("error", () => resolve(false));
    img.src = data.image;
  });

  const errors = [
    imageIsValid ? "" : "Image link appears to be invalid.",
    data.ingredients.length > 0 ? "" : "Please enter at least one ingredient.",
    form.checkValidity() ? "" : "Please check all fields.",
  ].filter((e) => e.length > 0);

  return {
    meta: {
      isValid: errors.length === 0,
      errors,
    },
    data,
  };
};

export const getRecipesHandler = async (e) => {
  e && e.preventDefault();
  await getAndRenderRecipes();
};

export const onAddNewRecipe = () => {
  $els.mainScreen.style.display = "none";
  $els.addRecipeScreen.style.display = "initial";
};
