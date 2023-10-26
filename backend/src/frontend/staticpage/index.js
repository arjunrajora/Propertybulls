const router = require('express').Router();
const { Staticpage } = require('../../db');
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors');

// controller
const controller = require('./staticpage.controller');

const {doGetAboutus,
       doGetHelp,
       doGetPrivacy,
       doGetTerms,

} = require('./staticpage.service');

const getAboutus = controller.getAboutus({
  BadRequestError,
  doGetAboutus,
  Staticpage,
});
const getHelp = controller.getHelp({
  BadRequestError,
  doGetHelp,
  Staticpage,
});
const getPrivacy = controller.getPrivacy({
  BadRequestError,
  doGetPrivacy,
  Staticpage,
});
const getTerms = controller.getTerms({
  BadRequestError,
  doGetTerms,
  Staticpage,
});
const StaticpageController = {
  getAboutus,
  getHelp,
  getPrivacy,
  getTerms
};


// routes
const routes = require('./staticpage.routes')({
  StaticpageController,
  router,
  makeExpressCallback,
});

module.exports = {
  StaticpageController,
  StaticpageService: {

    doGetAboutus,
    doGetHelp,
    doGetPrivacy,
    doGetTerms,
    
  },
  ClintStaticpageRoutes: routes, 
}; 
