const router = require("express").Router();
// const {
//   JWT_ACCESS_TOKEN_SECRET,
//   ACCESS_TOKEN_EXPIRES_IN,
//   SIGN_OPTION,
//   EMAIL,
//   INVITATION_TOKEN_EXPIRES_IN,
// } = require("config");

const { propertyTypes } = require("../../db");

 const { validatePropertyTypeAdd,validatePropertyTypeUpdate,  validateTypeStatus} = require("./viewPropertyTypevalidator");

const {
  doPropertyType,
  doGetPropertyType,
  doUpdatePropertyType,
  doDeletePropertyType,
     doStatus
} = require("./viewPropertyTypeservice");

const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("./viewPropertyTypecontroller");
const PropertyTypeAdd = controller.PropertyTypeAdd({
  BadRequestError,
  doPropertyType,
  validatePropertyTypeAdd,
});

const getType = controller.getType({
  BadRequestError,
  doGetPropertyType,
  propertyTypes
});



const updatePropertyType = controller.updatePropertyType({
  BadRequestError,
  propertyTypes,
  validatePropertyTypeUpdate,
  doUpdatePropertyType
});

const DeletePropertyType = controller.DeletePropertyType({
  BadRequestError,
  doDeletePropertyType,
});

const status = controller.status({
  BadRequestError,
  doStatus,
  propertyTypes,
    validateTypeStatus
});

const propertyTypesController = {
  PropertyTypeAdd,
  getType,
  DeletePropertyType,
  updatePropertyType,
  
  status
};

// routes
const routes = require("./viewPropertyTyperoutes")({
  propertyTypesController,
  router,
  makeExpressCallback,
});

module.exports = {
  propertyTypesController,
  propertyTypesService: {
    PropertyTypeAdd,
    getType,
    DeletePropertyType,
    updatePropertyType,
    
    status

  },
  propertyTypesRoutes: routes,
};
