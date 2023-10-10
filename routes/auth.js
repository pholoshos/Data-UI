const express = require("express");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const mailer = require("nodemailer");
const random = require("../random");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const Driver = require("../models/Driver");
const App = require("../models/App");
const CabDriver = require("../models/CabDriver");
const sendEmail = require("../utils/sendEmail");

router.get("/", (req, res) => {
  res.send({});
});

router.post("/", (req, res) => {
  res.send({});
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user with provided email
    const user = await User.findOne({
      $or: [
        { username: username }, // input is the value entered by the user (username, email, or phone)
        { email: username },
        { phone: username },
      ],
    });
    
    const {
      _id,
      email,
      phone,
      firstName,
      lastName,
      driverType,
      type,
      company,
      verified,
      area,
      isActive,
      expoPushToken,
    } = user;
    if (!user || isActive === false) {
      return res.status(401).json("Invalid username or password,");
    }

    // Check if provided password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json("Invalid username or password.");
    }

    // Login successful
    res.json({
      token: generateToken({ _id }),
      user: {
        username,
        type,
        id: _id,
        email,
        company,
        phone,
        driverType,
        verified,
        firstName,
        lastName,
        area,
        expoPushToken,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
  //res.send({ token: generateToken({ username }) })
});

//ss

router.post("/accessToken", (req, res) => {
  res.send({});
});

// POST endpoint for adding a driver and a user
router.post("/driver/add", async (req, res) => {
  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).json("Internal server error");
    } else {
      try {
        const appId = req.body.appId;
        // Retrieve the app with the specified appId
        const app = await App.findOne({ appId: appId });

        if (!app) {
          return res.status(404).json({ error: "App not found" });
        } else if (app.registrationsOpen) {
          try {
            // Extract user data from request body
            const {
              username,
              firstName,
              lastName,
              location,
              email,
              phone,
              password,
              driverType,
            } = req.body;

            // Create a new user
            const user = new User({
              username,
              firstName,
              lastName,
              location,
              driverType,
              isActive: false,
              type: "driver",
              email,
              phone,
              password: hash,
            });

            // Save the user to the database
            const savedUser = await user.save();

            // Extract driver data from request body
            const { carColor, idNumber, address, owner, areaOfBusiness } =
              req.body;

            // Create a new driver associated with the user
            const driver = new Driver({
              userId: savedUser._id,
              carColor,
              username,
              name: firstName + " " + lastName,
              idNumber,
              address,
              driverType,
              owner,
              areaOfBusiness,
            });

            // Save the driver to the database
            const savedDriver = await driver.save();

            res
              .status(201)
              .json({ message: "Driver and user added successfully" });
          } catch (error) {
            res.status(500).json({ error: error });
          }
        } else {
          res.status("400").json("registration closed");
        }
      } catch (error) {
        res.status(500).json({ error: "An error occurred2:" + error });
      }
    }
  });
});

router.post("/register", (req, res) => {
  const saltRounds = 10;
  // Hash the password using bcrypt
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).json("Internal server error");
    } else {
      // Create a new user with the hashed password
      let newUser = new User({
        firstName: req.body.firstName,
        originApp : req.body.app || 'none',
        username: req.body.username,
        lastName: req.body.lastName,
        location: req?.body?.location || " ",
        company: req?.body?.company || "none",
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
      });

      // Save the user to the database
      newUser
        .save()
        .then(() => {
          //console.log("User created");
          sendEmail({
            to: req.body.email,
            html: `
              <h1>Your account has been created ${req.body.firstName}</h1>
              <p>Your username is ${req.body.username},</p>
            `,
            subject: `Hello ${req.body.firstName}`,
          });
          // sendMessageExp(req.body.expoToken,{body:`Hello ${req.body.firstName} Welcome to Ola Ride!`});
          res.json({ message: "usercreated" });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json("Internal server error");
        });
    }
  });
});

// Endpoint to initiate password reset
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by their email
    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and save the password reset token to the user document
    user.generatePasswordReset();
    await user.save();

    const link = `https://softmore-apps-admin.vercel.app/reset-password?token=${user.resetPasswordToken}`;
    const emailContent = `Click the link below to reset your password:\n${link}`;
    // Send email here...
    sendEmail({
      to: email,
      subject: "Password Reset",
      html: `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Softmore Mo Password Reset</title>
    </head>
    
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #337ab7;">Softmore Mo Password Reset</h2>
        <p>Hello,</p>
        <p>You recently requested to reset your password for your Softmore Mo account. Click the button below to reset your
          password.</p>
        <p style="text-align: center;">
          <a href="${link}"
            style="display: inline-block; background-color: #337ab7; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reset
            Password</a>
        </p>
        <p>If you did not request to reset your password, please ignore this email. Your password will remain unchanged.</p>
        <p>Thank you,</p>
        <p>The Softmore Mo Team</p>
        <p style="font-size: 12px; color: #999999;">This is an automated email, please do not reply.</p>
      </div>
    </body>
    
    </html>
    `,
    });

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to handle password reset page submission
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the user by the reset token and check if it's valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const saltRounds = 10;
    // Hash the password using bcrypt
    bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Internal server error");
      } else {
        // Update the password field with the new password
        user.password = hash;
        // Clear the reset token and expiration date
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        // Save the updated user
        await user.save();
        return res.status(200).json({ message: "Password reset successful" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
