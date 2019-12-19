const Categories = require("../models").categories;
const Articles = require("../models").articles;

//show all categories task 1
exports.index = (req, res) => {
  Categories.findAll({ attributes: ["id", "name"] }).then(data =>
    res.send(data)
  );
};

//create category task 1
exports.store = (req, res) => {
  Categories.create(req.body).then(categories => {
    res.send({
      message: "success",
      categories
    });
  });
};

//get article by category task 3
exports.show = (req, res) => {
  Articles.findAll({
    attributes: ["id", "title", "content", "img", "createdAt", "updatedAt"],
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
