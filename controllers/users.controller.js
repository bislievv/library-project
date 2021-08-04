const User = require("../models/User.model");
const Book = require("../models/Book.model");

module.exports.usersController = {
  createAccount: async (req, res) => {
    try {
      await User.create({
        name: req.body.name,
        isBlocked: req.body.isBlocked,
        rentedBooks: [],
      });
      res.json("Аккаунт создан");
    } catch (err) {
      res.json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json("Аккаунт удален");
    } catch (e) {
      console.log(e);
    }
  },
  takeBook: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const book = await Book.findById(req.body.rentedBooks);

      if (user.isBlocked) {
        res.json("Вы заблокированы :)");
      } else if (user.rentedBooks.length >= 3) {
        res.json("Вы не можете арендовать более трех книг");
      } else if (book.rented) {
        res.json("Эта книга уже кем-то арендована");
      } else {
        await User.findByIdAndUpdate(req.params.id, {
          $push: { rentedBooks: req.body.rentedBooks },
        });
        await Book.findByIdAndUpdate(req.body.rentedBooks, {
          rented: req.params.id,
        });
        res.json("Вы успешно арендовали книгу");
      }
    } catch (err) {
      res.json(err);
    }
  },
  selectBook: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $pull: { rentedBooks: req.body.rentedBooks },
      });

      await Book.findByIdAndUpdate(req.body.rentedBooks, {
        rented: "",
      });

      await User.findByIdAndUpdate(req.params.id, {
        isBlocked: true,
      });

      res.json("Юзер забанен");
    } catch (err) {
      res.json(err);
    }
  },
};
