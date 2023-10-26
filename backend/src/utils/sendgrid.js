const sgMail = require("@sendgrid/mail");
const { API_KEY } = require("config");
const { InternalServerError } = require("./api-errors");
sgMail.setApiKey(API_KEY);

const sendMail = async function sendEmailToUser(template) {
  try {
    const sentMail = await sgMail.send(template);
    return sentMail;
  } catch (err) {
    throw new InternalServerError(err);
  }
};

module.exports = {
  sendMail,
};
