const router = require("express").Router();

const { City,State } = require("../../../db");

const {

  doGetCity,

  
} = require("./city.service");
// const {
//   validateUserRegisterData,
//   // validateSendMailData,
//    validateUserLoginData,
// }

const { validateAddCityData } = require("./city.validator");
const makeExpressCallback = require("../../../utils/express-callback");

const { BadRequestError } = require("../../../utils/api-errors");
// controller
const controller = require("./city.controller");


const getCity = controller.getCity({
  BadRequestError,
  doGetCity,
 City,
});



const CityController = {
  getCity,
 
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

    doGetCity,
    
  },
  CityclintRoutes: routes,
};
