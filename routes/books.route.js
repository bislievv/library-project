const { Router } = require("express");
const { booksController } = require("../controllers/books.controlles");

const router = Router();

router.post("/admin/books", booksController.addBook);
router.get("/admin/books", booksController.getBooks);
router.delete("/admin/books/:id", booksController.deleteBook);

router.get("/users/books", booksController.userGetBooks);
router.get("/users/books/:id", booksController.userGetCertain);
router.get("/users/genres/:id", booksController.userGetByGenre);

module.exports = router;
