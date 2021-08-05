const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    rentedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
