const router = require('express').Router();
const { Email } = require('../db');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./email.controller');
const {
  validateEmailCreateData,
  validateEmailUpdateData,
  validateUpdateEmailStatus
} = require('./email.validator');
const {
  doEmail,
  doGetEmail,
  doUpdateEmail,
  doDeleteEmail,
  doGetEmailById,
  doUpdateEmailStatus,
  doGetEmaildescription
} = require('./email.service');

const addEmail = controller.addEmail({
  BadRequestError,
  doEmail,
  validateEmailCreateData
});
const getEmail = controller.getEmail({
  BadRequestError,
  doGetEmail,
  Email,
});
const getEmaildescription = controller.getEmaildescription({
  BadRequestError,
  doGetEmaildescription,
  Email,
});
const updateEmail = controller.updateEmail({
  BadRequestError,
  Email,
  validateEmailUpdateData,
  doUpdateEmail,
});
const deleteEmail = controller.deleteEmail({
  BadRequestError,
  doDeleteEmail
});
const getEmailById = controller.getEmailById({
  BadRequestError,
  doGetEmailById
});
const updateEmailStatus = controller.updateEmailStatus({
  BadRequestError,
  Email,
  doUpdateEmailStatus,
  validateUpdateEmailStatus
});

const EmailController = {
  addEmail,
  getEmail,
  updateEmail,
  deleteEmail, 
  getEmailById,
  updateEmailStatus,
  getEmaildescription
};

// routes
const routes = require('./email.routes')({
  EmailController,
  router,
  makeExpressCallback,
});

module.exports = {
  EmailController,
  EmailService: {
    doEmail,
    doGetEmail,
    doUpdateEmail,
    doDeleteEmail,
    doGetEmailById,
    doUpdateEmailStatus,
    doGetEmaildescription
  },
  EmailRoutes: routes, 
}; 
