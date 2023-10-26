const router = require('express').Router();
const { VisibilityMatrix} = require('../db');
const moment = require('moment');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./VisibilityMatrix.controller');
const {
  imageUpload
} = require('../middlewares/fileUpload');
const {
  doVisibilityMatrix,
  dogetVisibilityMatrix
} = require('./VisibilityMatrix.service');

const addVisibilityMatrix = controller.addVisibilityMatrix({
  BadRequestError,
  doVisibilityMatrix,
});


const getVisibilityMatrix = controller.getVisibilityMatrix({
  BadRequestError,
  VisibilityMatrix,
  dogetVisibilityMatrix,
});

const VisibilityMatrixController = {
  addVisibilityMatrix,
  getVisibilityMatrix
};

// routes
const routes = require('./VisibilityMatrix.routes')({
  VisibilityMatrixController,
  router,
  makeExpressCallback,
});

module.exports = {
  VisibilityMatrixController,
  VisibilityMatrixService: {
    doVisibilityMatrix,
    dogetVisibilityMatrix
  
  },
  VisibilityMatrixRoutes: routes, 
}; 
