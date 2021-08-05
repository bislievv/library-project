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
  rentBook: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const book = await Book.findById(req.params.bookId);

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
        res.redirect(`localhost:3000/users/books/${book}`);
      }
    } catch (err) {
      res.json(err);
    }
  },
  selectBook: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        rentedBooks: [],
        isBlocked: true,
      });

      await Book.findByIdAndUpdate(req.body.blockedId, {
        rented: null,
      });

      res.redirect(
        "http://localhost:3000/admin/users/610aab4bc5a3a519d44e5f83"
      );
    } catch (err) {
      res.json(err);
    }
  },
  returnBook: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $pull: { rentedBooks: req.body.returnId },
      });
      await Book.findByIdAndUpdate(req.body.returnId, {
        rented: null,
      });
      res.redirect(
        "http://localhost:3000/users/books/610ac99df182fc2208aced57"
      );
    } catch (err) {
      res.json(err);
    }
  },
  getUsers: async (req, res) => {
    try {
      const data = await User.find({}).lean();
      res.render("adminka", {
        data,
      });
    } catch (err) {
      res.json(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).lean();
      res.render("singleUser", {
        user,
      });
    } catch (err) {
      res.json(err);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const data = await User.find({}).lean();
      res.render("profile", {
        data,
      });
    } catch (err) {
      res.json(err);
    }
  },
};
