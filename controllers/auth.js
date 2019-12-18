const jwt = require("jsonwebtoken");
const models = require("../models");

const User = models.users;

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: { email, password }
  }).then(user => {
    if (user) {
      const token = jwt.sign({ id: user.id }, "marbunn");
      res.send({
        user,
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
