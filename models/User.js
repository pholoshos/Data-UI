const mongoose = require('mongoose');
const random = require('../random');
//
const UserSchema = mongoose.Schema({
    username : {
        unique: true ,
        type : String,
        lowercase: true,
        required : true,
    },
    originApp : {
        type : String,
        default : 'none',
    },
    authorization_code : {
        type : String,
        default : '',
    },
    firstName : String,
    lastName : String,
    location : {
        type : String,
        lowercase : true,
        default : ''
    },
    verified:{
        type : Boolean,
        default : false
    },
    isActive : {
        type : Boolean,
        default : true,
    },
    veriCode : {
        type : String,
        default : random(5)
    },
    
    password : {
        type : String,
        required : true,
    },
    joinDate: {
        type  : Date,
        default : Date.now
    },
    email : {
        lowercase : true,
        type :String,
        requied : true,
    },
    phone :{
        unique : true,
        lowercase : true,
        type : String,
        required : true,
    },
    type: {
        type : String,
        default : 'user',
        lowercase : true,
    },
    driverType : {
        type : String,
        default : 'normal',
    },
    area : {
        lat : {
            type : Number,
            default : 0,

        },
        lng : {
            type : Number,
            default : 0,
            
        }
    },
    expoPushToken : {
        type: String,
        default : ''
    },
    company : {
        type : String,
        default : 'none',
    },
    resetPasswordToken: {
        type: String,
        default: null,
      },
      resetPasswordExpires: {
        type: Date,
        default: null,
      },

});

UserSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = random(20); // Replace this with your method to generate a unique token
    this.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
};

module.exports = mongoose.model('User',UserSchema);
