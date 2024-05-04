const express = require("express");
const router = express.Router();
const {
  getDonations,
  createDonation,
  updateDonation,
  getDonation,
  deleteDonation,
} = require("../controllers/donationsController");
const { verifyToken, checkRole } = require("../middleware/auth")


router.route("/donations").get(verifyToken, getDonations).post(verifyToken, createDonation)

router.route("/donations/:id").get(verifyToken, getDonation).put(verifyToken, updateDonation).delete(verifyToken, checkRole("admin"), deleteDonation)

module.exports = router;
