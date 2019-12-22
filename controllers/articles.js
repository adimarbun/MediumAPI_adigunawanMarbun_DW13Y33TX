const Articles = require("../models").articles;
const Categories = require("../models").categories;
const Users = require("../models").users;
const Comments = require("../models").comments;

//show articles
exports.index = (req, res) => {
  Articles.findAll({
    attributes: ["id", "title", "content", "img", "createdAt", "updatedAt"],
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      },
      {
        model: Users,
        as: "users",
        attributes: ["id", "name"]
      }
    ]
  }).then(data => res.send(data));
};

//show article by person taks 9

exports.showByUser = (req, res) => {
  Articles.findAll({
    attributes: ["id", "title", "content", "img", "createdAt", "updatedAt"],
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      }
    ],
    where: { createdBy: req.params.id }
  }).then(data => res.send(data));
};

//create article
exports.store = (req, res) => {
  request = {
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
    img: req.body.img,
    createdBy: userId
  };
  Articles.create(request).then(response => {
    Articles.findOne({
      attributes: ["id", "title", "content", "img", "createdAt", "updatedAt"],
      include: [
        {
          model: Categories,
          as: "categories",
          attributes: ["id", "name"]
        },
        {
          model: Users,
          as: "users",
          attributes: ["id", "name"]
        }
      ],
      where: { id: response.id }
    }).then(response => {
      res.send(response);
    });
  });
};

//show articles when idname=createdBy
exports.show = (req, res) => {
  request = {
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
    img: req.body.img,
    createdBy: userId
  };
  Articles.findAll({
    attributes: ["id", "title", "content", "img", "createdAt", "updatedAt"],
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      },
      {
        model: Users,
        as: "users",
        attributes: ["id", "name"]
      }
    ],
    where: { createdBy: userId }
  }).then(category => res.send(category));
};

//put update articel

exports.updateArticle = (req, res) => {
  let articleId = req.params.id;
  Articles.findOne({
    where: { id: articleId, createdBy: userId }
  }).then(response => {
    if (response) {
      let request = {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        img: req.body.img,
        createdBy: userId
      };

      Articles.update(request, {
        where: { id: articleId }
      }).then(() => {
        Articles.findOne({
          attributes: [
            "id",
            "title",
            "content",
            "img",
            "createdAt",
            "updatedAt"
          ],
          include: [
            {
              model: Categories,
              as: "categories",
              attributes: ["id", "name"]
            },
            {
              model: Users,
              as: "users",
              attributes: ["id", "name"]
            }
          ],
          where: { id: req.params.id }
        }).then(response => {
          res.send(response);
        });
      });
    } else {
      res.send({ message: "Not your Article" });
    }
  });
};

//delete article

exports.delete = (req, res) => {
  let articleId = req.params.id;
  Articles.findOne({
    where: { id: articleId, createdBy: userId }
  }).then(response => {
    if (response) {
      Articles.destroy({
        where: { id: articleId }
      }).then(data => {
        res.send({
          message: "success",
          data
        });
      });
    } else {
      res.send({ message: "Not your Article" });
    }
  });
};

//get populer articles

exports.populerArticle = (req, res) => {
  Articles.findAll().then(article => {
    let data = [];
    for (let i = 0; i < 10; i++) {
      max = article.length - 1;
      data.push(article[max - i]);
    }
    res.send(data);
  });
};

//task 5

exports.showArticle = (req, res) => {
  Articles.findOne({
    attributes: ["id", "title", "content", "img", "createdAt", "updatedAt"],
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      },
      {
        model: Comments,
        as: "comments",
        attributes: ["id", "comment", "createdAt", "updatedAt"]
      }
    ],
    where: { id: req.params.id }
  }).then(data => res.send(data));
};

// create comment

exports.createComment = (req, res) => {
  request = {
    userId: userId,
    articleId: req.params.id,
    comment: req.body.comment
  };
  Comments.create(request).then(data => {
    Comments.findOne({
      attributes: ["id", "comment"],
      include: [
        {
          model: Articles,
          as: "articles",
          attributes: ["id", "title"]
        }
      ],
      where: { id: data.id }
    }).then(response => {
      res.send(response);
    });
  });
};

//update comment

exports.updateComment = (req, res) => {
  Comments.findOne({
    where: { id: req.params.id, userId: userId }
  }).then(respon => {
    if (respon) {
      let request = {
        userId: userId,
        articleId: req.params.id,
        comment: req.body.comment
      };
      Comments.update(request, {
        where: { id: respon.id }
      }).then(() => {
        Comments.findOne({
          attributes: ["id", "comment"],
          include: [
            {
              model: Articles,
              as: "articles",
              attributes: ["id", "title"]
            }
          ],
          where: { id: req.params.id }
        }).then(response => {
          res.send(response);
        });
      });
    } else {
      res.send({ message: "Not your Comment" });
    }
  });
};

//delete comment
exports.deleteComment = (req, res) => {
  Comments.findOne({
    where: { id: req.params.id, userId: userId }
  }).then(respon => {
    if (respon) {
      Comments.destroy({
        where: { id: req.params.id }
      }).then(data => {
        res.send({
          message: "success",
          data
        });
      });
    } else {
      res.send({ message: "Not your Article" });
    }
  });
};

//show comment where id article
exports.showComment = (req, res) => {
  Comments.findAll({
    where: { articleId: req.params.id },
    attributes: ["id", "comment", "createdAt", "updatedAt"],
    include: [
      {
        model: Articles,
        as: "articles",
        attributes: ["id", "title"]
      }
    ]
  }).then(data => res.send(data));
};
