const express = require("express");
const router = express.Router();
const App = require("../models/App");


// GET endpoint to get all apps
router.get("/apps", async (req, res) => {
    try {
      // Retrieve all apps from the database
      const apps = await App.find();
  
      res.json({ apps });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
});


// PUT endpoint to turn off app registrations
router.put("/closeRegistrations/:appId", async (req, res) => {
  try {
    const { appId } = req.params;

    // Find the app by appId
    const app = await App.findOne({ appId });

    if (!app) {
      return res.status(404).json({ error: "App not found" });
    }

    // Update the registrationsOpen status to false
    app.registrationsOpen = false;
    await app.save();

    res.json({ message: "App registrations closed successfully", app });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { appName, appId, registrationsOpen, url, description, status } =
      req.body;

    // Create a new app
    const app = new App({
      appName,
      appId,
      registrationsOpen,
      url,
      description,
      status,
    });

    // Save the app to the database
    const savedApp = await app.save();

    res.status(201).json({ message: "App added successfully", app: savedApp });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//


module.exports = router;
