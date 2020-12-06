const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define("Notebook", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Notebook, {
    source: ["name"],
  });
  return Notebook;
};
