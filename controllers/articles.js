const Articles = require("../models").articles;
const Categories = require("../models").categories;
const Users = require("../models").users;

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

//put update articel
exports.updateArticle = (req, res) => {
  Articles.update(req.body, { where: { id: req.params.id } }).then(data => {
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
      where: { id: req.params.id }
    }).then(data => res.send(data));
  });
};

//create article
exports.store = (req, res) => {
  Articles.create(req.body).then(articles => {
    res.send({
      message: "succes",
      articles
    });
  });
};

//delete article
exports.delete = (req, res) => {
  Articles.destroy({ where: { id: req.params.id } }).then(data => {
    res.send({
      message: "success",
      data
    });
  });
};
