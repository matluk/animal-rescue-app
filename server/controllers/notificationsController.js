const Notification = require("../models/Notification");
const User = require("../models/User");

// Get all notifications
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find().populate("user");
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

// Create a new notification
const createNotification = async (req, res, next) => {
  const { title, description, isImportant, createdAt, userEmail } = req.body;
  const userId = await User.findOne({ email: userEmail }).select("_id");

  try {
    const newNotification = new Notification({
      title,
      description,
      isImportant,
      createdAt: createdAt,
      user: userId,
    });

    const savedNotification = await newNotification.save();
    res.json(savedNotification);
  } catch (error) {
    next(error);
  }
};

// Update a notification by ID
const updateNotification = async (req, res, next) => {
  try {
    const { title, description, isImportant, createdAt, userEmail } = req.body;
    const userId = await User.findOne({ email: userEmail }).select("_id");

    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        isImportant,
        createdAt: createdAt,
        user: userId,
      },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).send("Notification not found");
    }

    res.json(updatedNotification);
  } catch (error) {
    next(error);
  }
};

// Delete a notification by ID
const deleteNotification = async (req, res, next) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.id
    );
    if (!deletedNotification) {
      return res.status(404).send("Notification not found");
    }
    res.send("Notification deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
};
