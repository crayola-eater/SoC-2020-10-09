const { getAllRecipes, addRecipe } = require("./db/db");

const path = require("path");
const express = require("express");
const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/recipes", async (req, res) => {
  const response = await getAllRecipes();
  res.json({ payload: response.rows });
});

app.post("/api/recipes", async (req, res) => {
  const response = await addRecipe(req.body);
  res.json(response.rows);
});

app.listen(port, () => console.log(`Now running at localhost:${port}`));
