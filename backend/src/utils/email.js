const nodemailer = require('nodemailer');

const { InternalServerError } = require('./api-errors');
var smtp = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "vipul@doomshell.com",
    pass: "vipul@123",
  },
};
const transporter = nodemailer.createTransport(smtp);

const send = async function sendEmailToUser(template) {
    try {
        const sentMail = await transporter.sendMail(template);
        return sentMail;
    } catch (err) {
        throw new InternalServerError(err.message);
    }
};

module.exports = {
    send,
};
