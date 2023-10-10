const {Expo} = require('expo-server-sdk')

// Create a new Expo object
const expo = new Expo();

// Define your notification data
const notificationData = {
  title: 'My Notification Title',
  body: 'Hello, this is a test notification!',
};

// List of target Expo push tokens to receive the notification
const targetPushTokens = ['ExpoPushToken[...]'];

// Function to send Expo push notifications
async function sendExpoNotification(notificationData, targetPushTokens) {
  // Create an array to hold the messages for Expo
  const messages = [];

  // Prepare messages for each target push token
  for (const token of targetPushTokens) {
    // Check if the push token is valid
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Push token ${token} is not a valid Expo push token`);
      continue;
    }

    // Construct a message object
    messages.push({
      to: token,
      sound: 'default',
      title: notificationData.title,
      body: notificationData.body,
      data : notificationData?.data || {} 
    });
  }

  // Check if there are any messages to send
  if (messages.length === 0) {
    //console.log('No valid messages to send');
    return;
  }

  // Send the messages using Expo's sendPushNotificationsAsync
  try {
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    for (const chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }

    //console.log('Notifications sent:', tickets);
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}

// Call the function to send notifications
//sendExpoNotification(notificationData, targetPushTokens);

module.exports = sendExpoNotification;