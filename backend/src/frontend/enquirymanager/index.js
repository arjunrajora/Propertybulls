const router = require('express').Router();

const {
  Enquiry
} = require('../../db');

const {
  doEnquiry,
 
} = require('./enquiry.service');

const makeExpressCallback = require('../../utils/express-callback');

const { BadRequestError } = require('../../utils/api-errors');
// controller
const controller = require('./enquiry.controller');

const { validateAddEnquiryData,validateUpdateEnquiryData } = require('./enquiry.validator');



const enquiryAdd = controller.enquiryAdd({
  BadRequestError,
  doEnquiry,
  validateAddEnquiryData
});

const EnquiryController = {
    enquiryAdd,
};

// routes
const routes = require('./enquiry.routes')({
  EnquiryController,
  router,
  makeExpressCallback,
});

module.exports = {
  EnquiryController,
  EnquiryService: {
    doEnquiry,
  },
  ClintEnquiryRoutes: routes, 
};