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
  fetchNotebook,
} = require("../controllers/notebookController");

// Notebook Middleware Param
router.param("notebookId", async (req, res, next, notebookId) => {
  const notebook = await fetchNotebook(notebookId, next);
  if (notebook) {
    req.notebook = notebook;
    next();
  } else {
    const err = new Error("Notebook Not Found");
    err.status = 404;
    next(err);
  }
});

// Notebook List
router.get("/", notebookList);

// Notebook Create
router.post("/", upload.single("image"), notebookCreate);

// Notebook Update
router.put("/:notebookId", upload.single("image"), notebookUpdate);

// Notebook Delete
router.delete("/:notebookId", notebookDelete);

// Note Create
router.post("/:notebookId/notes", upload.single("image"), noteCreate);

module.exports = router;
