const Comment = require("../models/Comment.model");

module.exports.commentsController = {
  addComment: async (req, res) => {
    try {
      await Comment.create({
        text: req.body.text,
        user: req.body.user,
        book: req.body.book,
      });
      res.json("Комментарий добавлен");
    } catch (err) {
      res.json(err);
    }
  },
  getComments: async (req, res) => {
    try {
      const data = await Comment.find({});
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
};
