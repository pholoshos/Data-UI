var nodemailer = require('nodemailer');
require("dotenv/config");

const sendEmail = (data)=>{
    var transporter = nodemailer.createTransport({
        host: 'mail.softmoremo.co.za',
        port :465,
        secure : true,
        auth: {
          user: 'info@softmoremo.co.za',
          pass:  process.env.EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: 'info@softmoremo.co.za',
        to: data.to,
        subject: data.subject,
        text: data.body,
        html :  data.html,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          //console.log(error);
        } else {
          //console.log('Email sent: ' + info.response);
        }
      }); 
}


module.exports = sendEmail;