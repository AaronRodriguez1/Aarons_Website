const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendMail = async ({ name, email, message }) => {
  console.log('📬 MOCK EMAIL SENT');
  console.log(`From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  return Promise.resolve(); // pretend it succeeded
};