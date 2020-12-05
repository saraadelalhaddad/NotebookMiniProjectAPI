const express = require("express");
const router = express.Router();
const slugify = require("slugify");

const { noteCreate, noteList } = require("../controllers/noteController");

router.get("/", noteList);

router.post("/", noteCreate);

module.exports = router;
