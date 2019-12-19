const Articles = require("../models").articles;
const Categories = require("../models").categories;
const Users = require("../models").users;
const Comments = require("../models").comments;
const { authorized } = require("../middleware");

const jwt = require("jsonwebtoken");

//get id

function getId(data) {
  let id = JSON.stringify(data);
  id = id.split(",");
  id = id[0].substring(6, data.length);
  return id;
}
//get token from header
function getToken(reqHeader) {
  let token = reqHeader;
  token = token.split(" ");
  token = token[1];
  return token;
}

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

//create article
exports.store = (req, res) => {
  let token = getToken(req.headers["authorization"]);

  jwt.verify(token, "thisismysecretkey", (err, authorized) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      let userId = getId(authorized);

      request = {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        img: req.body.img,
        createdBy: userId
      };
      Articles.create(request).then(response => {
        let idArticle = getId(response);
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
          where: { id: idArticle }
        }).then(response => {
          res.send(response);
        });
      });
    }
  });
};

// //delete article
// exports.delete = (req, res) => {
//   Articles.destroy({ where: { id: req.params.id } }).then(data => {
//     res.send({
//       message: "success",
//       data
//     });
//   });
// };

// exports.show = (req, res) => {
//   Articles.findAll({
//     attributes: ["title", "content", "img", "createdAt", "updatedAt"],
//     include: [
//       {
//         model: Categories,
//         as: "categories",
//         attributes: ["id", "name"]
//       }
//     ],
//     where: { category: req.params.id }
//   }).then(category => res.send(category));
// };

//show articles when idname=createdBy
exports.show = (req, res) => {
  let token = getToken(req.headers["authorization"]);

  jwt.verify(token, "thisismysecretkey", (err, authorized) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      let userId = getId(authorized);

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
    }
  });
};

//put update articel

exports.updateArticle = (req, res) => {
  let token = getToken(req.headers["authorization"]);
  jwt.verify(token, "thisismysecretkey", (err, authorized) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      let userId = getId(authorized);
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
    }
  });
};

//delete article

exports.delete = (req, res) => {
  let token = getToken(req.headers["authorization"]);
  jwt.verify(token, "thisismysecretkey", (err, authorized) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      let userId = getId(authorized);
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
