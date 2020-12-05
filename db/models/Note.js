const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define("Note", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  SequelizeSlugify.slugifyModel(Note, {
    source: ["name"],
  });
  return Note;
};
