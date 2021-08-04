const { Router } = require("express");
const { genresController } = require("../controllers/genres.controller");

const router = Router();

router.post("/admin/genres", genresController.addGenre);
router.get("/admin/genres", genresController.getGenres);
router.delete("/admin/genres/:id", genresController.deleteGenre);

module.exports = router;
