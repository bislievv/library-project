const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");

const router = Router();

router.get("/admin/users", usersController.getUsers);
router.get("/admin/users/:id/", usersController.getUser);
router.get("/admin/users/:id/blocked", usersController.selectBook); // Отобрать все книги и заблокировать
router.get("/admin/users/:id/unBlocked", usersController.unblockedUser); // Отобрать все книги и заблокировать

router.post("/users", usersController.createAccount);
router.delete("/users", usersController.deleteUser);
router.get("/users", usersController.getAllUsers);
router.get("/users/:userId/take/:bookId", usersController.rentBook); // Взять книгу в аренду
router.get("/users/:userId/:bookId", usersController.returnBook); // Вернуть книгу

module.exports = router;
