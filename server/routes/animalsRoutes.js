const express = require("express");
const router = express.Router();
const {
  getAnimals,
  createAnimal,
  updateAnimal,
  getAnimal,
  deleteAnimal,
} = require("../controllers/animalsController");
const { verifyToken, checkRole } = require("../middleware/auth")

router.route("/animals").get(verifyToken, getAnimals).post(verifyToken, checkRole("admin"), createAnimal)

router.route("/animals/:id").get(verifyToken, getAnimal).put(verifyToken, updateAnimal).delete(verifyToken, checkRole("admin"), deleteAnimal)

module.exports = router;
