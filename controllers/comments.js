const Comments = require("../models").comments;
const Articles = require("../models").articles;

// create comment

exports.createComment = (req, res) => {
  request = {
    userId: userId,
    articleId: req.params.idArticle,
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
    where: {
      articleId: req.params.idArticle,
      userId: userId,
      id: req.params.id
    }
  }).then(respon => {
    if (respon) {
      let request = {
        userId: userId,
        articleId: req.params.idArticle,
        comment: req.body.comment,
        id: req.params.id
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
    where: {
      articleId: req.params.idArticle,
      userId: userId,
      id: req.params.id
    }
  }).then(respon => {
    if (respon) {
      Comments.destroy({
        where: { id: respon.id }
      }).then(() => {
        res.send({
          message: "success delete",
          id: respon.id
        });
      });
    } else {
      res.send({ message: "Not your Comment" });
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
