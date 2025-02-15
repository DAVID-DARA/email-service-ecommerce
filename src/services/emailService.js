const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const mailOptions = {
  from: 'yourusername@email.com',
  to: 'yourfriend@email.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// Send the email
const sendEmail= async () => {
    try {
        const info  = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId)
    } catch (error) {
        console.error("Error sending email", error);
        
    }
}


module.exports = sendEmail;