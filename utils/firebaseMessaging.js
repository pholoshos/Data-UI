const admin = require("firebase-admin");

// Initialize Firebase Admin SDK here
const serviceAccount = require("./ola-rides-firebase-adminsdk-aghxd-db4701e573.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: "AIzaSyCzkYyUsCitZCNqqAgUsdagFAvl5xJiYhg",
  authDomain: "ola-rides.firebaseapp.com",
  projectId: "ola-rides",
  storageBucket: "ola-rides.appspot.com",
  messagingSenderId: "419332623571",
  appId: "1:419332623571:web:2758aca2dcc264337a5826",
  measurementId: "G-0WHXXR78MY",
};

// Function to send a notification to a specific device token
async function sendNotificationToDevice(deviceToken, notificationData) {
  try {
    await admin.messaging().sendToDevice(deviceToken, {
      notification: {
        title: notificationData.title,
        body: notificationData.body,
      },
    });
    //console.log("Notification sent successfully.");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

module.exports = sendNotificationToDevice;
