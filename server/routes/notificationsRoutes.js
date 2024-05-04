const express = require("express");
const router = express.Router();
const {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notificationsController");
const { verifyToken, checkRole } = require("../middleware/auth")

router.route("/notifications").get(verifyToken, getNotifications).post(verifyToken, createNotification);

router.route("/notifications/:id").delete(verifyToken, checkRole("admin"), deleteNotification).put(verifyToken, updateNotification);

module.exports = router;
