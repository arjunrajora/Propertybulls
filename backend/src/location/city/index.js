const router = require("express").Router();

const { City, State } = require("../../db");

const {
  doCity,
  doGetCity,
  doDeleteCity,
  doUpdateCity,
  // doGetCityById,
  doUpdateCityStatus,
  doSearchCity,
  doGetState
} = require("./city.service");
// const {
//   validateUserRegisterData,
//   // validateSendMailData,
//    validateUserLoginData,
// }

const { validateAddCityData,
  validateUpdateCityData,
  validateUpdateStatus

} = require("./city.validator");
const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("./city.controller");
const cityAdd = controller.cityAdd({
  BadRequestError,
  doCity,
  validateAddCityData,
});

const getCity = controller.getCity({
  BadRequestError,
  doGetCity,
  City,
  State,
});

const deleteCity = controller.deleteCity({
  BadRequestError,
  doDeleteCity,
});
const updateCity = controller.updateCity({
  BadRequestError,
  doUpdateCity,
  City,
  validateUpdateCityData,
});
// const getCityById = controller.getCityById({
//   BadRequestError,
//   // doGetCityById
// });


const updateCityStatus = controller.updateCityStatus({
  BadRequestError,
  City,
  doUpdateCityStatus,
  validateUpdateStatus,
});

const searchCity = controller.searchCity({
  BadRequestError,
  City,
  doSearchCity,
  State
});

// View State
const getState = controller.getState({
  BadRequestError,
  doGetState,
  State,
});



const CityController = {
  cityAdd,
  getCity,
  deleteCity,
  updateCity,
  // getCityById,
  updateCityStatus,
  searchCity,
  getState

};

// routes
const routes = require("./city.routes")({
  CityController,
  router,
  makeExpressCallback,
});

module.exports = {
  CityController,
  CityService: {
    doCity,
    doGetCity,
    doDeleteCity,
    doUpdateCity,
    // doGetCityById,
    doUpdateCityStatus,
    doSearchCity,
    doGetState
  },
  CityRoutes: routes,
};
