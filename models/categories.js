"use strict";
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "categories",
    {
      name: DataTypes.STRING
    },
    {}
  );
  categories.associate = function(models) {
    // ssociations can be defined here
  };
  return categories;
};
