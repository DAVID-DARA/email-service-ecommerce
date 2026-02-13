const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail= async ({to, subject, body}) => {
    try {
      const mailOptions = {
        from: 'no-reply@lorem.com',
        to, 
        subject,
        html: body
      };
        const info  = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId)
    } catch (error) {
        console.error("Error sending email", error);
    }
}


module.exports = sendEmail;