const jwt = require("express-jwt");

exports.auth = jwt({
  secret: "marbunn"
});

exports.authorized = (req, res, next) => {
  if (req.user.id != req.params.createdBy) {
    return res.status(401).json({ message: "You are not authenticated." });
  }
  next();
};

exports.authenticated = jwt({ secret: "marbunn" });
