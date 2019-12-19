"use strict";
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define(
    "articles",
    {
      title: DataTypes.STRING,
      category: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      img: DataTypes.STRING,
      createdBy: DataTypes.INTEGER
    },
    {}
  );
  articles.associate = function(models) {
    articles.belongsTo(models.categories, {
      foreignKey: "category",
      as: "categories",
      sourceKey: "id"
    });
    articles.belongsTo(models.users, {
      foreignKey: "createdBy",
      as: "users",
      sourceKey: "id"
    });

    articles.hasMany(models.comments, { foreignKey: "articleId" });
  };
  return articles;
};
