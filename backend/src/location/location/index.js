const router = require('express').Router();
const { Location, City, State } = require('../../db');
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors');
// controller
const controller = require('./location.controller');
const {
  validateLocationCreateData,
  validateLocationUpdateData,
  validateUpdateLocationStatus
} = require('./location.validator');
const {
  doLocation,
  doCheckUserExist,
  doGetLocation,
  doUpdateLocation,
  doSearchLocation,
  doDeleteLocation,
  doGetLocationById,
  doUpdateLocationStatus,
  doGetCity
} = require('./location.service');

const addLocation = controller.addLocation({
  BadRequestError,
  doLocation,
  State,
  City,
  validateLocationCreateData
});
const getLocation = controller.getLocation({
  BadRequestError,
  doGetLocation,
  Location,
  City
});
const updateLocation = controller.updateLocation({
  BadRequestError,
  Location,
  validateLocationUpdateData,
  doUpdateLocation,
});
const searchLocation = controller.searchLocation({
  BadRequestError,
  Location,
  doSearchLocation,
  City
});
const deleteLocation = controller.deleteLocation({
  BadRequestError,
  doDeleteLocation
});
const getLocationById = controller.getLocationById({
  BadRequestError,
  doGetLocationById
});
const updateLocationStatus = controller.updateLocationStatus({
  BadRequestError,
  Location,
  doUpdateLocationStatus,
  validateUpdateLocationStatus
});

// view City
const getCity = controller.getCity({
  BadRequestError,
  doGetCity,
  City
});




const LocationController = {
  addLocation,
  getLocation,
  updateLocation,
  searchLocation,
  deleteLocation,
  getLocationById,
  updateLocationStatus,
  getCity
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
    doLocation,
    // doCheckUserExist,
    doGetLocation,
    doUpdateLocation,
    doSearchLocation,
    doDeleteLocation,
    doGetLocationById,
    doUpdateLocationStatus,
    doGetCity
  },
  LocationRoutes: routes,
}; 
