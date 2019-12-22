"use strict";
module.exports = (sequelize, DataTypes) => {
  const follows = sequelize.define(
    "follows",
    {
      followed: DataTypes.INTEGER,
      following: DataTypes.INTEGER
    },
    {}
  );
  follows.associate = function(models) {
    follows.belongsTo(models.users, {
      foreignKey: "following",
      as: "users",
      sourceKey: "id"
    });
  };
  return follows;
};
