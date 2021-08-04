const mongoose = require("mongoose");

const genreSchema = mongoose.Schema(
  {
    name: String,
  },
  { timesStamps: true }
);

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
