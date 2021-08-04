const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");

const router = Router();

router.post("/users", usersController.createAccount);
router.delete("/users", usersController.deleteUser);
router.patch("/users/take/:id", usersController.takeBook);
router.patch("/users/blocked/:id", usersController.selectBook);

module.exports = router;
