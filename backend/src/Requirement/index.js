const router = require('express').Router();
const { Requirement, Location, City, State, propertyTypes, Customer, User, Role } = require('../db');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./requirement.controller');
const {
  validateRequirementCreateData,
  validateRequirementUpdateData,
  validateUpdateRequirementStatus
} = require('./requirement.validator');
const {
  doRequirement,
  doGetRequirement,
  doUpdateRequirement,
  doDeleteRequirement,
  doGetRequirementById,
  doUpdateRequirementStatus,
  doSearchRequirement,
} = require('./requirement.service');

const addRequirement = controller.addRequirement({
  BadRequestError,
  doRequirement,
  validateRequirementCreateData
});
const getRequirement = controller.getRequirement({
  BadRequestError,
  doGetRequirement,
  Requirement,
  Location,
  City, State,
  Role,
  propertyTypes,
  User
});
const updateRequirement = controller.updateRequirement({
  BadRequestError,
  Requirement,
  validateRequirementUpdateData,
  doUpdateRequirement,
});
const deleteRequirement = controller.deleteRequirement({
  BadRequestError,
  doDeleteRequirement
});
const getRequirementById = controller.getRequirementById({
  BadRequestError,
  doGetRequirementById
});
const updateRequirementStatus = controller.updateRequirementStatus({
  BadRequestError,
  Requirement,
  doUpdateRequirementStatus,
  validateUpdateRequirementStatus
});



const searchRequirement = controller.searchRequirement({
  BadRequestError,
  Requirement,
  doSearchRequirement,
  Location,
  City,
  State,
  propertyTypes,
  User,
  Role
});










const RequirementController = {
  addRequirement,
  getRequirement,
  updateRequirement,
  deleteRequirement,
  getRequirementById,
  updateRequirementStatus,
  searchRequirement
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
    doGetRequirement,
    doUpdateRequirement,
    doDeleteRequirement,
    doGetRequirementById,
    doUpdateRequirementStatus,
    doSearchRequirement,
  },
  RequirementRoutes: routes,
}; 
