const Articles = require("../models").articles;
const Categories = require("../models").categories;

exports.index = (req, res) => {
  Articles.findAll({
    attributes: ["title", "content", "img", "createdAt", "updatedAt"],
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      }
    ]
  }).then(data => res.send(data));
};
