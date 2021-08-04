const path = require("path");
const Book = require("../models/Book.model");
const Comment = require("../models/Comment.model");

module.exports.booksController = {
  addBook: async (req, res) => {
    try {
      await Book.create({
        name: req.body.name,
        category: req.body.category,
        rented: req.body.rented,
      });
      res.json("Книга добавлена");
    } catch (err) {
      res.json(err);
    }
  },
  getBooks: async (req, res) => {
    try {
      const data = await Book.find({});
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  deleteBook: async (req, res) => {
    try {
      await Book.findByIdAndRemove(req.params.id);
      res.json("Книга удалена");
    } catch (err) {
      res.json(err);
    }
  },
  userGetBooks: async (req, res) => {
    try {
      const data = await Book.find({}).lean();
      res.render("home", {
        data,
      });
    } catch (err) {
      res.json(err);
    }
  },
  userGetCertain: async (req, res) => {
    try {
      const com = await Comment.find({ book: req.params.id }).lean();
      const data = await Book.findById(req.params.id).lean();
      res.render("singleBook", {
        data,
        com,
      });
    } catch (err) {
      res.json(err);
    }
  },
  userGetByGenre: async (req, res) => {
    try {
      const data = await Book.find({ category: req.params.id });
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  addImage: async (req, res) => {
    try {
      const newFileName = `/booksImage/${Math.random() * 10000}${path.extname(
        req.files.image.name
      )}`;

      req.files.image.mv(`./public${newFileName}`, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await Book.findByIdAndUpdate(req.params.id, { image: newFileName });
          res.json("Файл загружен");
        }
      });
    } catch (err) {
      res.json(err);
    }
  },
};
