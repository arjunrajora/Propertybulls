const router = require('express').Router();
const {
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
  EMAIL,
  INVITATION_TOKEN_EXPIRES_IN,
} = require('config');

const {
  Static
} = require('../db');

// const emailTransporter = require('../utils/email');

const {
  doStatic,
  doGetStatic,
  doDeleteStatic,
  doUpdateStatic,
  doGetStaticById,
  doUpdateStaticStatus,




} = require('./static.service');
// const {
//   validateUserRegisterData,
//   // validateSendMailData,
//    validateUserLoginData,
// } 

const {
  validateAddStaticData,
  validateUpdateStaticData,
  validateUpdateStaticStatus
} = require('./static.validator');

const makeExpressCallback = require('../utils/express-callback');

const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./static.controller');
const staticAdd = controller.staticAdd({
  BadRequestError,
  doStatic,
  validateAddStaticData,
  
});

const getStatic = controller.getStatic({
  BadRequestError,
  doGetStatic


})

const deleteStatic = controller.deleteStatic({
  BadRequestError,
  doDeleteStatic
})

const updateStatic = controller.updateStatic({
  BadRequestError,
  doUpdateStatic,
  Static,
  validateUpdateStaticData
})
const getStaticById = controller.getStaticById({
  BadRequestError,
  doGetStaticById
});

const updateStaticStatus = controller.updateStaticStatus({
  BadRequestError,
  Static,
  doUpdateStaticStatus,
  validateUpdateStaticStatus,
});








const StaticController = {
  staticAdd,
  getStatic,
  deleteStatic,
  updateStatic,
  getStaticById,
  updateStaticStatus,



};

// routes
const routes = require('./static.routes')({
  StaticController,
  router,
  makeExpressCallback,
});

module.exports = {
  StaticController,
  StaticService: {
    doStatic,
    doGetStatic,
    doDeleteStatic,
    doUpdateStatic,
    doGetStaticById,
    doUpdateStaticStatus,



  },
  StaticRoutes: routes,
};