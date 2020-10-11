// Should contain the controls available for ingredients.

import { createIngredientElement } from "./ingredient.js";

const editControl = {
  name: "edit",
  icon: "✏️",
  handler: (el) => {
    const input = el.closest(".ingredient").querySelector(".ingredient__label");
    input.focus();
  },
};

const deleteControl = {
  name: "delete",
  icon: "🗑️",
  handler: (el) => {
    const li = el.closest(".ingredient");
    li.parentNode.removeChild(li);
  },
};

const copyControl = {
  name: "copy",
  icon: "📄",
  handler: (el) => {
    const li = el.closest(".ingredient");
    const ingredient = li.querySelector(".ingredient__label").value;
    const copiedElement = createIngredientElement(ingredient);
    li.insertAdjacentElement("afterend", copiedElement);
  },
};

export const ingredientControls = [editControl, deleteControl, copyControl];
