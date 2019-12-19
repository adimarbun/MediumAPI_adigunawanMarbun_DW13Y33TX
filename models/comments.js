"use strict";
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    "comments",
    {
      userId: DataTypes.INTEGER,
      articleId: DataTypes.INTEGER,
      comment: DataTypes.TEXT
    },
    {}
  );
  comments.associate = function(models) {
    comments.belongsTo(models.articles, {
      foreignKey: "articleId",
      as: "articles",
      sourceKey: "id"
    });
  };
  return comments;
};
