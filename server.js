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
  //show categories task 1
  router.get("/categories", CategoriesController.index);
  //create category task1
  router.post("/category", CategoriesController.store);
  //show articles by category task 3
  router.get("/category/:id/articles", CategoriesController.show);
  //show all articles TASK 2
  router.get("/articless", ArticlesController.index);

  //show article by person
  router.get("/user/:id/articles", ArticlesController.showByUser);

  //populer articles
  router.get("/populer", ArticlesController.populerArticle);
  //show article task 5
  router.get("/article/:id", ArticlesController.showArticle);
  //show articles where user id= category id
  router.get("/articles", ArticlesController.show);
  //create articles bearer token task 4
  router.post("/article", auth, ArticlesController.store);
  //update articles task 4
  router.put("/article/:id", auth, ArticlesController.updateArticle);
  //delete article task 4
  router.delete("/article/:id", auth, ArticlesController.delete);
  //login
  router.post("/login", Auth.login);
  //register
  router.post("/register", Auth.register);
  //get users
  router.get("/users", Auth.showUsers);

  //post comment
  router.post("/article/:id/comment", auth, ArticlesController.createComment);
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You are not authorizedd" });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));
