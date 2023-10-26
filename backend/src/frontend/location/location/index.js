const router = require('express').Router();
const { Location ,City} = require('../../../db');
const makeExpressCallback = require('../../../utils/express-callback');
const { BadRequestError } = require('../../../utils/api-errors');
// controller
const controller = require('./location.controller');
const {
  validateLocationCreateData,
  validateLocationUpdateData
} = require('./location.validator');
const {
  doGetLocation,

} = require('./location.service');


const getLocation = controller.getLocation({
  BadRequestError,
  doGetLocation,
  City,
  Location,
});





const LocationController = {
 
  getLocation,
 
};

// routes
const routes = require('./location.routes')({
  LocationController,
  router,
  makeExpressCallback,
});

module.exports = {
  LocationController,
  LocationService: {

    doGetLocation,
 
  },
  locationclintRoutes: routes, 
}; 
