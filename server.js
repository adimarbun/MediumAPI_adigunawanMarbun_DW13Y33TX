require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
app.use(bodyParser.json());

const CategoriesController = require("./controllers/categories");
const ArticlesController = require("./controllers/articles");

app.group("/api/v1", router => {
  router.get("/categories", CategoriesController.index);
  router.post("/category", CategoriesController.store);
  router.get("/articles", ArticlesController.index);
});

app.listen(port, () => console.log(`listening on port ${port}`));
