const Follows = require("../models").follows;
const Users = require("../models").users;

exports.follow = (req, res) => {
  request = {
    followed: userId,
    following: req.body.following
  };
  if (userId !== req.body.following) {
    Follows.create(request).then(data => {
      Follows.findOne({
        attributes: ["id"],
        include: [
          {
            model: Users,
            as: "users",
            attributes: ["id", "email"]
          }
        ],
        where: { id: data.id }
      }).then(response => {
        res.send(response);
      });
    });
  } else {
    res.send({ message: "sorry " });
  }
};
