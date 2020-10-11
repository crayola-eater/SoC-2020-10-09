// Function(s) responsible for creating elements representing an ingredient.

import { ingredientControls } from "./ingredientControls.js";

export const createIngredientElement = (ingredient) => {
  const container = document.createElement("li");
  container.classList.add("ingredient");

  const label = document.createElement("input");
  label.classList.add("ingredient__label");
  label.name = "ingredients";
  label.value = ingredient;
  label.dataset.action = "edit";

  const controlsContainer = document.createElement("div");
  controlsContainer.classList.add("ingredient__controls-container");

  for (const { name, icon } of ingredientControls) {
    const button = document.createElement("button");
    button.classList.add("control", `ingredient__${name}`);
    button.dataset.action = name;
    button.textContent = icon;
    controlsContainer.appendChild(button);
  }
  container.append(label, controlsContainer);
  return container;
};
