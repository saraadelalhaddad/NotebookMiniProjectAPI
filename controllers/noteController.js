const { Note } = require("../db/models");
const SequelizeSlugify = require("sequelize-slugify");

exports.noteCreate = async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.noteList = async (req, res) => {
  try {
    const notes = await Note.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log("notes", notes);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
