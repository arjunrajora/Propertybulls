const router = require('express').Router();
const { Contactus } = require('../../db');
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors');

// controller
const controller = require('./contactus.controller');

const {doGetContactus,
} = require('./contactus.service');

const getContactus = controller.getContactus({
  BadRequestError,
  doGetContactus,
  Contactus,
});



const ContactusController = {
    getContactus,
  
  };



// routes
const routes = require('./contactus.routes')({
  ContactusController,
  router,
  makeExpressCallback,
});

module.exports = {
  ContactusController,
  ContactusService: {

    doGetContactus,
  
    
  },
  ClintContactusRoutes: routes, 
}; 
