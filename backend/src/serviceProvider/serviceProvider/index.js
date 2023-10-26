const router = require('express').Router();
const { ServiceProvider } = require('../../db');
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors');
// controller
const controller = require('./serviceProvider.controller');
const {
  validateServiceProviderCreateData,
  validateServiceProviderUpdateData,
  validateUpdateServiceProviderStatus
} = require('./serviceProvider.validator');
const {
  doServiceProvider,
  doGetServiceProvider,
  doUpdateServiceProvider,
  doSearchServiceProvider,
  doDeleteServiceProvider,
  doGetServiceProviderById,
  doUpdateServiceProviderStatus
} = require('./serviceProvider.service');

const addServiceProvider = controller.addServiceProvider({
  BadRequestError,
  doServiceProvider,
  validateServiceProviderCreateData
});
const getServiceProvider = controller.getServiceProvider({
  BadRequestError,
  doGetServiceProvider,
  ServiceProvider,
});
const updateServiceProvider = controller.updateServiceProvider({
  BadRequestError,
  ServiceProvider,
  validateServiceProviderUpdateData,
  doUpdateServiceProvider,
});
const searchServiceProvider = controller.searchServiceProvider({
  BadRequestError,
  ServiceProvider,
  doSearchServiceProvider,
});
const deleteServiceProvider = controller.deleteServiceProvider({
  BadRequestError,
  doDeleteServiceProvider
});
const getServiceProviderById = controller.getServiceProviderById({
  BadRequestError,
  doGetServiceProviderById
});
const updateServiceProviderStatus = controller.updateServiceProviderStatus({
  BadRequestError,
  ServiceProvider,
  doUpdateServiceProviderStatus,
  validateUpdateServiceProviderStatus
});

const ServiceProviderController = {
  addServiceProvider,
  getServiceProvider,
  updateServiceProvider,
  searchServiceProvider,
  deleteServiceProvider, 
  getServiceProviderById,
  updateServiceProviderStatus
};

// routes
const routes = require('./serviceProvider.routes')({
  ServiceProviderController,
  router,
  makeExpressCallback,
});

module.exports = {
  ServiceProviderController,
  ServiceProviderService: {
    doServiceProvider,
    doGetServiceProvider,
    doUpdateServiceProvider,
    doSearchServiceProvider,
    doDeleteServiceProvider,
    doGetServiceProviderById,
    doUpdateServiceProviderStatus
  },
  ServiceProviderRoutes: routes, 
}; 
