const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const upload = require("../middleware/multer");

const {
  //   noteCreate,
  noteList,
  noteUpdate,
  noteDelete,
  fetchNote,
} = require("../controllers/noteController");

router.param("noteId", async (req, res, next, noteId) => {
  const note = await fetchNote(noteId, next);
  if (note) {
    req.note = note;
    next();
  } else {
    const err = new Error("Note Not Found");
    err.status = 404;
    next(err);
  }
});

// Note List
router.get("/", noteList);

// // Note Create
// router.post("/notebooks/:notebookId/notes", upload.single("image"), noteCreate);

// Note Update
router.put("/:noteId", upload.single("image"), noteUpdate);

// Note Delete
router.delete("/:noteId", noteDelete);

module.exports = router;
