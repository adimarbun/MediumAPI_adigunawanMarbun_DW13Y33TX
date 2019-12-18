"use strict";
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define(
    "articles",
    {
      title: DataTypes.STRING,
      category: DataTypes.INTEGER,
      content: DataTypes.STRING,
      img: DataTypes.STRING
    },
    {}
  );
  articles.associate = function(models) {
    articles.belongsTo(models.categories, {
      foreignKey: "category",
      as: "categories",
      sourceKey: "id"
    });
  };
  return articles;
};
