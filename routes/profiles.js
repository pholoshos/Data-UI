const express  = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');
const mailer = require('nodemailer');
const random = require('../random');


router.get('/',(req,res)=>{
    res.send({})
})


module.exports = router;