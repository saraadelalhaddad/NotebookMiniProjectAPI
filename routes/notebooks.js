const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const upload = require("../middleware/multer");

const {
  noteCreate,
  notebookCreate,
  notebookList,
  notebookUpdate,
  notebookDelete,
} = require("../controllers/notebookController");

// Notebook List
router.get("/", notebookList);

// Notebook Create
router.post("/", upload.single("image"), notebookCreate);

// Notebook Update
router.put("/:noteId", upload.single("image"), notebookUpdate);

// Notebook Delete
router.delete("/:noteId", notebookDelete);

// Note Create
router.post("/:notebookId/notes", upload.single("image"), noteCreate);

module.exports = router;
