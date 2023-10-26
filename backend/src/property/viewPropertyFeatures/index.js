const router = require("express").Router();
// const {
//   JWT_ACCESS_TOKEN_SECRET,
//   ACCESS_TOKEN_EXPIRES_IN,
//   SIGN_OPTION,
//   EMAIL,
//   INVITATION_TOKEN_EXPIRES_IN,
// } = require("config");

const { Features,Type } = require("../../db");

 const { validatePropertyfeaturesAdd,validatePropertyfeaturesUpdate,
  validateFeaturesStatus} = require("./viewPropertyFeaturesvalidator");

const {
  doPropertyFeatures,
  doGetPropertyFeatures,
  doUpdatePropertyFeatures,
  doDeletePropertyFeatures,
  //  doPropertyFacing,
  //  doGetPropertyFacing,
  //  doUpdatePropertyFacing,
  //  doDeletePropertyFacing,
   doStatus
} = require("./viewPropertyFeaturesservice");

const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("./viewPropertyFeaturescontroller");
const PropertyfeaturesAdd = controller.PropertyfeaturesAdd({
  BadRequestError,
  doPropertyFeatures,
  validatePropertyfeaturesAdd,
});

const getFeatures = controller.getFeatures({
  BadRequestError,
  doGetPropertyFeatures,
  Type,
  Features
});



const updatePropertyFeatures = controller.updatePropertyFeatures({
  BadRequestError,
  Features,
  validatePropertyfeaturesUpdate,
  doUpdatePropertyFeatures
});

const DeletePropertyFeatures = controller.DeletePropertyFeatures({
  BadRequestError,
  doDeletePropertyFeatures,
});

const status = controller.status({
  BadRequestError,
  doStatus,
  Features,
  validateFeaturesStatus
});

const FeaturesController = {
  PropertyfeaturesAdd,
  getFeatures,
  updatePropertyFeatures,
  DeletePropertyFeatures,
  // PropertyFacingAdd,
  // getFacing,
  // updatePropertyFacing,
  // DeletePropertyFacing,
  status
};

// routes
const routes = require("./viewPropertyFeaturesroutes")({
  FeaturesController,
  router,
  makeExpressCallback,
});

module.exports = {
  FeaturesController,
  FeaturesService: {
    PropertyfeaturesAdd,
    getFeatures,
    updatePropertyFeatures,
    DeletePropertyFeatures,
    // PropertyFacingAdd,
    // getFacing,
    // updatePropertyFacing,
    // DeletePropertyFacing,
    doStatus
  },
  PropertyFeatures: routes,
};
