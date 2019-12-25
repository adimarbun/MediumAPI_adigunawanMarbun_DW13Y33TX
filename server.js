require("express-group-routes");
const { auth } = require("./middleware");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
const CategoriesController = require("./controllers/categories");
const ArticlesController = require("./controllers/articles");
const Auth = require("./controllers/auth");
const FollowsController = require("./controllers/follow");
const CommentsController = require("./controllers/comments");
const cors = require("cors");

app.use(cors());

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
  router.get("/popular", ArticlesController.popularArticle);
  //show article task 5
  router.get("/article/:id", ArticlesController.showArticle);
  //show articles where user id= category id
  router.get("/articles", auth, ArticlesController.show);
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
  router.post(
    "/article/:idArticle/comment",
    auth,
    CommentsController.createComment
  );
  //update comment
  router.put(
    "/article/:idArticle/comment/:id",
    auth,
    CommentsController.updateComment
  );
  //delete comment
  router.delete(
    "/article/:idArticle/comment/:id",
    auth,
    CommentsController.deleteComment
  );
  //get all comment where id article
  router.get("/article/:id/comment", CommentsController.showComment);
  //follow
  router.post("/follow", auth, FollowsController.follow);
});

// app.use((err, req, res, next) => {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).json({ message: "You are not authorizedd" });
//   } else {
//     next(err);
//   }
// });

app.listen(port, () => console.log(`listening on port ${port}`));
