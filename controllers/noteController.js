const SequelizeSlugify = require("sequelize-slugify");
const { Notebook, Note } = require("../db/models");

exports.fetchNote = async (noteId, next) => {
  try {
    const note = await Note.findByPk(noteId);
    return note;
  } catch (error) {
    next(error);
  }
};

exports.noteList = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      attributes: { exclude: ["notebookId", "createdAt", "updatedAt"] },
      include: {
        model: Notebook,
        as: "notebook",
        attributes: ["name"],
      },
    });
    console.log("notes", notes);
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// exports.noteCreate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     const newNote = await Note.create(req.body);
//     res.status(201).json(newNote);
//   } catch (error) {
//     next(error);
//   }
// };

exports.noteUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.note.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.noteDelete = async (req, res, next) => {
  try {
    await req.note.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
