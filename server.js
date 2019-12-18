require("express-group-routes");
const { auth, authorized, authenticated } = require("./middleware");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
app.use(bodyParser.json());
const CategoriesController = require("./controllers/categories");
const ArticlesController = require("./controllers/articles");
const Auth = require("./controllers/auth");

app.group("/api/v1", router => {
  //show categories
  router.get("/categories", CategoriesController.index);
  //create category
  router.post("/category", CategoriesController.store);
  //show articles by category
  router.get("/category/:id/articles", CategoriesController.show);
  //show articles
  router.get("/articles", ArticlesController.index);
  //create articles
  router.post("/article", auth, ArticlesController.store);
  //update articles
  router.put("/article/:id", auth, ArticlesController.updateArticle);
  //delete article
  router.delete("/article/:id", auth, ArticlesController.delete);
  //login
  router.post("/login", Auth.login);
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You are not authorized" });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));
