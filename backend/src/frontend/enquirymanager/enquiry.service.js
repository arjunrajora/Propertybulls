
const { Enquiry, sequelize } = require("../../db");

const { generateJWT, verifyJWT } = require("../../utils/jwt");

const { NotFoundError, BadRequestError } = require("../../utils/api-errors");
const enquiry = require(".");

// Enquiry Add
const doEnquiry = async ({ f_name,email,phone,message }) => {
  const enquiry = await Enquiry.create({ f_name,email,phone,message });
  return { enquiryId: enquiry.id };
};



module.exports = {
  doEnquiry,
};
