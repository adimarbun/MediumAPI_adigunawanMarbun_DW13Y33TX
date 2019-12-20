const jwt = require("express-jwt");

// exports.authorized = (req, res, next) => {
//   if (req.user.id != req.params.createdBy) {
//     return res.status(401).json({ message: "You are not authenticated." });
//   }
//   next();
// };

exports.authenticated = jwt({ secret: "thisismysecretkey" });
