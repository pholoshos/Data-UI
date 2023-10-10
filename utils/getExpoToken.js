const User = require("../models/User");

async function getExpoPushToken(userId) {
  try {
    const user = await User.findById(userId);
    if (user) {
      return user.expoPushToken || null;
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error("Error retrieving Expo Push Token:", error);
    return null;
  }
}


module.exports = getExpoPushToken;