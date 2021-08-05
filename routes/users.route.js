const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");

const router = Router();

router.get("/admin/users", usersController.getUsers);
router.get("/admin/users/:id", usersController.getUser);
// router.get("/admin/:userId/:blockedId/:id", usersController.selectBook);

router.post("/users", usersController.createAccount);
router.delete("/users", usersController.deleteUser);
router.get("/users", usersController.getAllUsers);
router.get("/users/:userId/books/:bookId", usersController.rentBook);
router.get("/users/:userId/:returnId/:id", usersController.returnBook);

module.exports = router;
