const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,  // This is your email address (sender's email)
    pass: process.env.EMAIL_PASSWORD,  // Your app password
  },
});

module.exports = transporter;
