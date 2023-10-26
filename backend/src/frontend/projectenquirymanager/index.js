const router = require('express').Router();

const {
  Projectenquiry
} = require('../../db');

const {
  doProjectenquiry,
  doCreateSession,
  doCheckUserExistOtp
 
} = require('./projectenquiry.service');

const makeExpressCallback = require('../../utils/express-callback');

const { BadRequestError } = require('../../utils/api-errors');
// controller
const controller = require('./projectenquiry.controller');

const { validateAddEnquiryData } = require('./projectenquiry.validator');



const projectenquiryAdd = controller.projectenquiryAdd({
  BadRequestError,
  doProjectenquiry,
  doCreateSession,
  validateAddEnquiryData
});
const CheckUserExistOtp = controller.CheckUserExistOtp({
  BadRequestError,
  doCheckUserExistOtp,
  doProjectenquiry
});


const ProjectenquiryController = {
    projectenquiryAdd,
    CheckUserExistOtp
};

// routes
const routes = require('./projectenquiry.routes')({
  ProjectenquiryController,
  router,
  makeExpressCallback,
});

module.exports = {
  ProjectenquiryController,
  ProjectenquiryService: {
  doProjectenquiry,
  doCreateSession,
  doCheckUserExistOtp
  },
  ClintProjectenquiryRoutes: routes, 
};