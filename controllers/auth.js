const jwt = require("jsonwebtoken");
const models = require("../models");
const Users = require("../models").users;

const User = models.users;

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: { email, password }
  }).then(user => {
    if (user) {
      const token = jwt.sign({ user }, "thisismysecretkey");
      res.send({
        userId: user.id,
        username: user.username,
        token
      });
    } else {
      res.send({
        error: true,
        message: "wrong email or password"
      });
    }
  });
};

exports.register = (req, res) => {
  Users.create(req.body).then(user => {
    const token = jwt.sign({ id: user.id }, "thisismysecretkey");
    res.send({
      email: user.email,
      token
    });
  });
};

exports.index = (req, res) => {
  Categories.findAll({ attributes: ["id", "name"] }).then(data =>
    res.send(data)
  );
};
exports.showUsers = (req, res) => {
  Users.findAll().then(user => res.send(user));
};
