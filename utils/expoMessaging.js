const { Expo } = require("expo-server-sdk");

// Create a new Expo SDK client
const expo = new Expo();

// Your Expo push notification credentials (usually found in your Expo account)
const expoPushCredentials = {
  accessToken: "val09vfD7LutL8QnQZfHu68zFXXAV7lG3H1m96NV",
  refreshToken: "YOUR_REFRESH_TOKEN",
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
};

// Create a function to send push notifications
async function sendPushNotification(pushToken, val) {
  try {
    // Create a list of push notification tokens you want to send the notification to
    const pushTokens = [pushToken];

    // Create a message object with the notification details
    const message = {
      to: pushTokens,
      sound: "default",
      title: "Ola Ride",
      body: val?.body,
    };

    if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        return;
      }


    // Send the push notification
    const response = await expo.sendPushNotificationsAsync(
      [message],
      expoPushCredentials
    );

    // Process the response to check for any errors
    const { data, errors } = response;
    if (errors) {
      console.error("Errors:", errors);
    }

    // If successful, you can access the ticket IDs for each notification
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const { id } = data[i];
        //console.log("Notification sent successfully. Ticket ID:", id);
      }
    }
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}

const sendMessageExp = (pushToken, data) => {
  try {
    axios.post("https://api.expo.dev/v2/push/send", [
      {
        badge: 12,
        body: data.body,
        channelId: "1",
        sound: "default",
        title: "Ola Rides",
        to: pushToken,
      },
    ]);
  } catch {
    //console.log("LOG:::failed to send notification");
  }
};

module.exports = sendPushNotification;
