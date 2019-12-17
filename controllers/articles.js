const Article = require("../models").article;
const Category = require("../models").category;
const User = require("../models").user;

exports.index = (req, res) => {
  Articles.findAll().then(articles => res.send(articles));
};
