const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const notesRouter = require("./routes/notes");
const notebooksRouter = require("./routes/notebooks");
const db = require("./db/models");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/notes", notesRouter);
app.use("/notebooks", notebooksRouter);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found!" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    // await db.sequelize.sync();
    // await db.sequelize.sync({ alter: true });
    await db.sequelize.sync({ force: true });

    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
