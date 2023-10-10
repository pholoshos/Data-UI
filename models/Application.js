const mongoose = require('mongoose');

//schema

const ApplicationSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    details : {
        type : String,
    },
        
    date :{
        type : Date,
        default : Date.now
    },
    status : {
        type : String,
        default : 'waiting',
        lowercase : true
    },
    user : {
        type : String,
        lowercase :  true,
    }
});

module.exports = mongoose.model('Application',ApplicationSchema);