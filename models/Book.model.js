const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    name: String,
    image: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    rented: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
