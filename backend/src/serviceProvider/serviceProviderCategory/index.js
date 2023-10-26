const router = require('express').Router();
const { ServiceCategory } = require('../../db');
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors');
// controller
const controller = require('./serviceCategory.controller');
const {
  validateServiceCategoryCreateData,
  validateServiceCategoryUpdateData,
  validateUpdateServiceCategoryStatus
} = require('./serviceCategory.validator');
const {
  doServiceCategory,
  doGetServiceCategory,
  doUpdateServiceCategory,
  doDeleteServiceCategory,
  doGetServiceCategoryById,
  doUpdateServiceCategoryStatus
} = require('./serviceCategory.service');

const addServiceCategory = controller.addServiceCategory({
  BadRequestError,
  doServiceCategory,
  validateServiceCategoryCreateData
});
const getServiceCategory = controller.getServiceCategory({
  BadRequestError,
  doGetServiceCategory,
  ServiceCategory,
});
const updateServiceCategory = controller.updateServiceCategory({
  BadRequestError,
  ServiceCategory,
  validateServiceCategoryUpdateData,
  doUpdateServiceCategory,
});
const deleteServiceCategory = controller.deleteServiceCategory({
  BadRequestError,
  doDeleteServiceCategory
});
const getServiceCategoryById = controller.getServiceCategoryById({
  BadRequestError,
  doGetServiceCategoryById
});
const updateServiceCategoryStatus = controller.updateServiceCategoryStatus({
  BadRequestError,
  ServiceCategory,
  doUpdateServiceCategoryStatus,
  validateUpdateServiceCategoryStatus
});

const ServiceCategoryController = {
  addServiceCategory,
  getServiceCategory,
  updateServiceCategory,
  deleteServiceCategory, 
  getServiceCategoryById,
  updateServiceCategoryStatus
};

// routes
const routes = require('./serviceCategory.routes')({
  ServiceCategoryController,
  router,
  makeExpressCallback,
});

module.exports = {
  ServiceCategoryController,
  ServiceCategoryService: {
    doServiceCategory,
    doGetServiceCategory,
    doUpdateServiceCategory,
    doDeleteServiceCategory,
    doGetServiceCategoryById,
    doUpdateServiceCategoryStatus
  },
  ServiceCategoryRoutes: routes, 
}; 
