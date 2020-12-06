const { Notebook } = require("../db/models");
const SequelizeSlugify = require("sequelize-slugify");

exports.fetchNotebook = async (notebookId, next) => {
  try {
    const notebook = await Notebook.findByPk(notebookId);
    return notebook;
  } catch (error) {
    next(error);
  }
};

exports.notebookList = async (req, res, next) => {
  try {
    const notebooks = await Notebook.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Note,
          as: "notes",
          attributes: ["id"],
        },
      ],
    });
    console.log("notebooks", notebooks);
    res.json(notebooks);
  } catch (error) {
    next(error);
  }
};

exports.notebookCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newNotebook = await Notebook.create(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};

exports.notebookUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.notebook.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.notebookDelete = async (req, res, next) => {
  try {
    await req.notebook.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.noteCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.notebookId = req.notebookId;
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
