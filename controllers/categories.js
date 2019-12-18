const Categories = require("../models").categories;
const Articles = require("../models").articles;

exports.index = (req, res) => {
  Categories.findAll().then(categories => res.send(categories));
};

exports.store = (req, res) => {
  Categories.create(req.body).then(categories => {
    res.send({
      message: "success",
      categories
    });
  });
};

exports.show = (req, res) => {
  Articles.findAll({
    attributes: ["title", "content", "img", "createdAt", "updatedAt"],
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      }
    ],
    where: { category: req.params.id }
  }).then(category => res.send(category));
};
