const router = require("express").Router();
// const {
//   JWT_ACCESS_TOKEN_SECRET,
//   ACCESS_TOKEN_EXPIRES_IN,
//   SIGN_OPTION,
//   EMAIL,
//   INVITATION_TOKEN_EXPIRES_IN,
// } = require("config");

const { Facing } = require("../../db");

const { validatePropertyFacing,validateUPdatePropertyFacing ,validateFacingStatus} = require("./viewPropertyFacingvalidator");

const {
   doPropertyFacing,
   doGetPropertyFacing,
   doUpdatePropertyFacing,
   doDeletePropertyFacing,
   doStatus
} = require("./viewPropertyFacingservice");

const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("./viewPropertyFacingcontroller");
const PropertyFacingAdd = controller.PropertyFacingAdd({
  BadRequestError,
  doPropertyFacing,
  validatePropertyFacing,
});

const getFacing = controller.getFacing({
  BadRequestError,
  doGetPropertyFacing,
});

const DeletePropertyFacing = controller.DeletePropertyFacing({
  BadRequestError,
  doDeletePropertyFacing,
});

const updatePropertyFacing = controller.updatePropertyFacing({
  BadRequestError,
  doUpdatePropertyFacing,
  Facing,
  validateUPdatePropertyFacing
});

// const EditFaq = controller.EditFaq({
//   BadRequestError,
//   doEditFaq,
// });

const status = controller.status({
  BadRequestError,
  doStatus,
  Facing,
  validateFacingStatus
});

const FacingController = {
  PropertyFacingAdd,
  getFacing,
  updatePropertyFacing,
  DeletePropertyFacing,
  status
};

// routes
const routes = require("./viewPropertyFacingroutes")({
  FacingController,
  router,
  makeExpressCallback,
});

module.exports = {
  FacingController,
  FacingService: {
    PropertyFacingAdd,
    getFacing,
    updatePropertyFacing,
    DeletePropertyFacing,
    doStatus
  },
  PropertyFacing: routes,
};
