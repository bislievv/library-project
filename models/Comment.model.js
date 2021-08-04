const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  },
  { timesStamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
