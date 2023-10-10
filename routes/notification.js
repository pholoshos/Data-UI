const express = require("express");
const router = express.Router();
const Notification = require('../models/Notification')

router.put("/notifications/:id/read", async (req, res) => {
  try {
    const notificationId = req.params.id;
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: "Error updating notification status" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user, message, app } = req.body; // Assuming the request body contains user, message, and app fields
    const newNotification = new Notification({ user, message, app });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: "Error creating notification" });
  }
});

// After connecting to MongoDB and before defining the router.listen

// Fetch notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const notificationId = req.params.id;
    const deletedNotification = await Notification.findByIdAndDelete(
      notificationId
    );

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification" });
  }
});

router.get("/app", async (req, res) => {
  try {
    const { user, app } = req.query; // Assuming you pass user and app as query parameters
    const query = {};

    if (user) {
      query.user = user;
    }

    if (app) {
      query.app = app;
    }

    const notifications = await Notification.find(query).sort({
      timestamp: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

router.get("/read", async (req, res) => {
  try {
    const { user, app } = req.query; // Assuming you pass user and app as query parameters
    const query = {};
   

    if (user) {
      query.user = user;
    }

    if (app) {
      query.app = app;
    }

    const notifications = await Notification.find(query).sort({
      timestamp: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

module.exports = router;
