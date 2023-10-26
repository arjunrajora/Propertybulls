/** @format */
const Twilio = require('twilio');
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  VERIFICATION_SID,
} = require('config');
const { InternalServerError } = require('./api-errors');

const twilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


const send = async (template) => {
  try {
    const sentOTP = twilioClient.verify
      .services(VERIFICATION_SID)
      .verifications.create(template);
    return sentOTP;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};


const verifyOTP = async (template) => {
  try {
    const sentOTP = twilioClient.verify
      .services(VERIFICATION_SID)
      .verificationChecks.create(template);
    return sentOTP;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};
module.exports = { send, verifyOTP };
