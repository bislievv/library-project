const { Router } = require("express");
const { booksController } = require("../controllers/books.controlles");

const router = Router();

router.post("/admin/books", booksController.addBook);
router.get("/admin/books", booksController.getBooks);
router.delete("/admin/books/:id", booksController.deleteBook);
router.post("/admin/books/:id", booksController.addImage);

router.get("/users/guest/books", booksController.userGetBooks);
router.get("/users/:userId/books/", booksController.certainUserGetBooks);
router.get("/users/:userId/books/:id", booksController.userGetCertain);
router.get("/users/genres/:id", booksController.userGetByGenre);

module.exports = router;
