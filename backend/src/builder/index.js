const router = require('express').Router();
const { Builder, Location, State,
  property,
  propertyTypes,
  Facing,
  Responses } = require('../db');
const moment = require('moment');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./builder.controller');
const {
  validateBuilderCreateData,
  validateBuilderUpdateData,
  validateUpdateBuilderStatus
} = require('./builder.validator');
const {
  imageUpload
} = require('../middlewares/fileUpload');
const {
  doBuilder,
  doCheckUserExist,
  doGetBuilder,
  doUpdateBuilder,
  doSearchBuilder,
  doDeleteBuilder,
  doGetBuilderById,
  doUpdateBuilderStatus,
  doUpdateFeatured,
  doGetProject,
  doCheckProjectbyBuilder
} = require('./builder.service');

const addBuilder = controller.addBuilder({
  BadRequestError,
  doBuilder,
  doCheckUserExist,
  validateBuilderCreateData,
  imageUpload
});
const getBuilder = controller.getBuilder({
  BadRequestError,
  doGetBuilder,
  Builder,
  Location,
  State,
  property
});
const getProject = controller.getProject({
  BadRequestError,
  doGetProject,
  Builder,
  property,
  Location,
  propertyTypes,
  Facing,
  Responses,

});
const updateBuilder = controller.updateBuilder({
  BadRequestError,
  Builder,
  validateBuilderUpdateData,
  doUpdateBuilder,
});
const searchBuilder = controller.searchBuilder({
  BadRequestError,
  Builder,
  doSearchBuilder,
  property,
  Location
});
const deleteBuilder = controller.deleteBuilder({
  BadRequestError,
  doDeleteBuilder,
  doCheckProjectbyBuilder,
  property 
});
const getBuilderById = controller.getBuilderById({
  BadRequestError,
  doGetBuilderById
});
const updateBuilderStatus = controller.updateBuilderStatus({
  BadRequestError,
  Builder,
  doUpdateBuilderStatus,
  validateUpdateBuilderStatus
});
const updateFeatured = controller.updateFeatured({
  BadRequestError,
  Builder,
  doUpdateFeatured,
  // validateUpdateFeatured
});

const BuilderController = {
  addBuilder,
  getBuilder,
  updateBuilder,
  searchBuilder,
  deleteBuilder, 
  getBuilderById,
  updateBuilderStatus,
  updateFeatured,
  getProject
};

// routes
const routes = require('./builder.routes')({
  BuilderController,
  router,
  makeExpressCallback,
});

module.exports = {
  BuilderController,
  BuilderService: {
    doBuilder,
    doCheckUserExist,
    doGetBuilder,
    doUpdateBuilder,
    doSearchBuilder,
    doDeleteBuilder,
    doGetBuilderById,
    doUpdateBuilderStatus,
    doUpdateFeatured,
    doGetProject
  },
  BuilderRoutes: routes, 
}; 
