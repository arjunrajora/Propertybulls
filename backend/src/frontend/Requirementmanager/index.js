const router = require('express').Router();
const { Requirement ,propertyTypes } = require('../../db');
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors');
// controller
console.log(propertyTypes,"hello");
const controller = require('./requirement.controller');
const {
  validateRequirementCreateData,
  validateRequirementUpdateData,
  validateUpdateRequirementStatus
} = require('./requirement.validator');
const {
  doRequirement,
  doGetRequirements,
  doGetRequirementbyId,
  doDeleteRequirement,
  doGetRequirementbuycategory
} = require('./requirement.service');

const addRequirement = controller.addRequirement({
  BadRequestError,
  doRequirement,
  validateRequirementCreateData
});


const getRequirementbyId = controller.getRequirementbyId({
  BadRequestError,
  doGetRequirementbyId,
  Requirement,
  propertyTypes
});

const getRequirements = controller.getRequirements({
  BadRequestError,
  doGetRequirements,
  Requirement,
  propertyTypes
});


const deleteRequirement = controller.deleteRequirement({
  BadRequestError,
  doDeleteRequirement
});

const getRequirementsbycategory = controller.getRequirementsbycategory({
  BadRequestError,
  doGetRequirementbuycategory,
  Requirement,
  propertyTypes
});


const RequirementController = {
  addRequirement,
  getRequirementbyId,
  getRequirements,
  deleteRequirement,
  getRequirementsbycategory
};

// routes
const routes = require('./requirement.routes')({
  RequirementController,
  router,
  makeExpressCallback,
});

module.exports = {
  RequirementController,
  RequirementService: {
    doRequirement,
    doGetRequirementbyId,
    doGetRequirements,
    doDeleteRequirement,
    doGetRequirementbuycategory

  },
  RequirementmanagerRoutes: routes, 
}; 
