const router = require('express').Router();

const { Property, Location, propertyTypes, Propertyfeature, propertyImage, propertydetails, User, Role,Features} = require('../../db');
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors');

// controller
const controller = require('./propertydetail.controller');

const { doGetPropertydetail, doview, doGetPropertydetailById, dogetPropertyType,
  dogetPropertydetail, docheckpro_id } = require('./propertydetail.service');

const getPropertydetail = controller.getPropertydetail({
  BadRequestError,
  doGetPropertydetail,
  Property,
  propertyTypes,

});


const getview = controller.getview({
  BadRequestError,
  doview,
  Property,
  Location,
  User

});


const getPropertydetailById = controller.getPropertydetailById({
  BadRequestError,
  doGetPropertydetailById,
  docheckpro_id,
  User,
  Role,
  Property,
  propertyTypes,
  propertyImage, propertydetails, Propertyfeature,
  Features

});

const getPropertydetailurlby = controller.getPropertydetailurlby({
  BadRequestError,
  dogetPropertydetail,
  Property,
});


const chackpro_id = controller.chackpro_id({
  BadRequestError,
  docheckpro_id,
  Propertyfeature,
});



const getPropertyType = controller.getPropertyType({
  BadRequestError,
  dogetPropertyType,
  propertyTypes

});


const PropertydetailController = {

  getPropertydetail,
  getview,
  getPropertydetailById,
  getPropertydetailurlby,
  chackpro_id,
  getPropertyType
};




// routes
const routes = require('./propertydetail.routes')({
  PropertydetailController,
  router,
  makeExpressCallback,
});

module.exports = {
  PropertydetailController,
  PropertydetailService: {

    doGetPropertydetail,
    doview,
    doGetPropertydetailById,
    dogetPropertydetail,
    docheckpro_id,
    dogetPropertyType
  },
  ClintPropertydetailRoutes: routes,
}; 
