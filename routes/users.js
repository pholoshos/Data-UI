const express = require("express");
const router = express.Router();
const User = require("../models/User");
const getUser = require("../utils/getUser");
const App = require("../models/App");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST endpoint to add an app
router.post("/app/add", async (req, res) => {
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

// Endpoint to update Expo push notification token
router.post('/update-expo-token/:userId', async (req, res) => {
  const { userId } = req.params;
  const { expoToken } = req.body;
  console.log("LOG:::token",expoToken,userId);

  try {
    const user = await User.findByIdAndUpdate( userId,{ expoPushToken :  expoToken},{new : true});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error:' +error});
  }
});


router.post("/updateArea", async (req, res) => {
  const { id, lat, lng } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's area with the provided latitude and longitude
    user.area.lat = lat;
    user.area.lng = lng;
    await user.save();

    return res.status(200).json({ message: "Area updated successfully" });
  } catch (error) {
    console.error("An error occurred", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/app/closeRegistrations/:appId", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/userId/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { _id, email, phone, firstName, lastName, type, verified, area,username } =
      user;

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({
      user: {
        username,
        type,
        id: _id,
        email,
        phone,
        verified,
        firstName,
        lastName,
        area,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Define the route for updating the isActive field
router.put("/activate", async (req, res) => {
  const { isActive ,username} = req.body;

  try {
    // Find the user by ID
    const user = await User.findOne({username : username});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the isActive field
    user.isActive = isActive;
    await user.save();

    // Return the updated user
    return res.json('Done!');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/verify", async (req, res) => {

  const { verified,username } = req.body;

  try {
    // Find the user by ID
    const user = await User.findOne({username : username});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the isVerified field
    user.verified = verified;
    await user.save();

    // Return the updated user
    return res.json('Done!');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user", async (req, res) => {
  const { id, username } = getUser(req);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// Define the endpoint to update the authorization code
router.post('/update-authorization-code', async (req, res) => {
  try {
    const { id, authorization_code } = req.body;

    // Find the user by their username
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the authorization_code field
    user.authorization_code = authorization_code;
    await user.save();

    res.json({ message: 'Authorization code updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
