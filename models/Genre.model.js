const mongoose = require("mongoose");

const genreSchema = mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
