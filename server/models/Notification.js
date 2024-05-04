const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 20 },
  description: { type: String, required: true, minLength: 10, maxLength: 200 },
  isImportant: Boolean,
  createdAt: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
