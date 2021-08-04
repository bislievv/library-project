const Genre = require("../models/Genre.model");

module.exports.genresController = {
  addGenre: async (req, res) => {
    try {
      await Genre.create({
        name: req.body.name,
      });
      res.json("Жанр добавлен");
    } catch (err) {
      res.json(err);
    }
  },
  getGenres: async (req, res) => {
    try {
      const data = await Genre.find({});
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  deleteGenre: async (req, res) => {
    try {
      await Genre.findByIdAndRemove(req.params.id);
      res.json("Жанр удален");
    } catch (err) {
      res.json(err);
    }
  },
};
