const Notification = require("../models/Notification");

const createNotification =  async({user,message,app})=>{
    const newNotification = new Notification({ user, message, app });
    await newNotification.save();
}

module.exports = createNotification;
