const router = require("express").Router();
// const {
//   JWT_ACCESS_TOKEN_SECRET,
//   ACCESS_TOKEN_EXPIRES_IN,
//   SIGN_OPTION,
//   EMAIL,
//   INVITATION_TOKEN_EXPIRES_IN,
// } = require("config");

const { property, GALLERY, propertyperealtions, State, City, Location, propertyTypes, Facing, User, Role, propertyImage, Propertyfeature } = require("../../db");

const { validatePropertyTypeAdd, validatePropertyTypeUpdate, validateTypeStatus } = require("./viewPropertyvalidator");

const {
  doProperty,
  doGetProperty,
  doDeleteProperty,
  doStatus,
  // doPropertyDetail,
  doPropertyImg,
  doPropertyfeatures,
  doSearchProperty,
  doGetPropertyType,
  doGetPropertybyid,
  doUpdateProperty,
  doUpdatePropertyImg,
  doUpdatePropertyfeatures,
  doPropertyFloorImg,
  doUpdateDescription,
  doUpdateFeatured
} = require("./viewPropertyservice");

const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("./viewPropertycontroller");
const PropertyAdd = controller.PropertyAdd({
  BadRequestError,
  doProperty,
  doProperty,
  // doPropertyDetail,
  doPropertyImg, doPropertyfeatures,
  doPropertyFloorImg
});


const GetProperty = controller.GetProperty({
  BadRequestError,
  doGetProperty,
  property,
  State,
  City,
  Location,
  Role,
  propertyperealtions,
  propertyTypes,
  Facing,
  User
});



const updateProperty = controller.updateProperty({
  BadRequestError,
  doProperty,
  doUpdateProperty,
  doUpdatePropertyImg,
  doUpdatePropertyfeatures,
  propertyImage,
  Propertyfeature,
  property

});

const DeleteProperty = controller.DeleteProperty({
  BadRequestError,
  doDeleteProperty,


});
const searchProperty = controller.searchProperty({
  BadRequestError,
  doSearchProperty,
  property,
  State,
  City,
  Location,
  User,
  propertyTypes,
  Facing,
  Role,
});

const status = controller.status({
  BadRequestError,
  doStatus,
  property,
  validateTypeStatus
});

const getPropertytype = controller.getPropertytype({
  BadRequestError,
  doGetPropertyType,
  propertyTypes,

});

// property detail by id Description&Remark
const getPropertybyid = controller.getPropertybyid({
  BadRequestError,
  doGetPropertybyid,
  property,
  propertyImage,
  Propertyfeature

});

// Update property description & remark
const updateDescription = controller.updateDescription({
  BadRequestError,
  doUpdateDescription,
  property
});


const updateFeatured = controller.updateFeatured({
  BadRequestError,
  doUpdateFeatured,
  property
});





const propertyController = {
  PropertyAdd,
  GetProperty,
  DeleteProperty,
  updateProperty,
  status,
  searchProperty,
  getPropertytype,
  getPropertybyid,
  updateDescription,
  updateFeatured
  // updatePropertyType
};

// routes
const routes = require("./viewPropertyroutes")({
  propertyController,
  router,
  makeExpressCallback,
});

module.exports = {
  propertyController,
  propertyService: {
    PropertyAdd,
    GetProperty,
    DeleteProperty,
    updateProperty,
    status,
    searchProperty,
    getPropertytype,
    doGetPropertybyid,
    doUpdateProperty,
    doUpdatePropertyImg,
    doUpdatePropertyfeatures,
    doUpdateDescription,
    doUpdateFeatured

  },
  propertyRoutes: routes,
};
