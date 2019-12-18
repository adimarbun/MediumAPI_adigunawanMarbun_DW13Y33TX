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
