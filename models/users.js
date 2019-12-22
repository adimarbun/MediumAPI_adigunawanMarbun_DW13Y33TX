"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  users.associate = function(models) {
    users.hasMany(models.follows, {
      foreignKey: "following"
    });
    users.hasMany(models.follows, {
      foreignKey: "followed"
    });
  };
  return users;
};
