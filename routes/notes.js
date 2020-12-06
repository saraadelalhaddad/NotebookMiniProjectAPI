const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const upload = require("../middleware/multer");

const {
  //   noteCreate,
  noteList,
  noteUpdate,
  noteDelete,
} = require("../controllers/noteController");

// Note List
router.get("/", noteList);

// // Note Create
// router.post("/notebooks/:notebookId/notes", upload.single("image"), noteCreate);

// Note Update
router.put("/:noteId", upload.single("image"), noteUpdate);

// Note Delete
router.delete("/:noteId", noteDelete);

module.exports = router;
