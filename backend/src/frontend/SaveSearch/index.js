const router = require('express').Router();
const { Saveserch} = require('../../db');
const moment = require('moment');
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors');
// controller
const controller = require('./savesearch.controller');
const {
  doSave,
  doGetsavesearchById,
  doDeleteSaveSearch
} = require('./savesearch.service');

const addSave = controller.addSave({
  BadRequestError,
  doSave,

});
const getsavesearchById = controller.getsavesearchById({
  BadRequestError,
  doGetsavesearchById,
  Saveserch
});
const DeleteSaveSearch = controller.DeleteSaveSearch({
  BadRequestError,
  doDeleteSaveSearch,
  Saveserch
});
// const getProject = controller.getProject({
//   BadRequestError,
//   doGetProject,
//   Builder,
//   property,
//   Location,
//   propertyTypes,
//   Facing,
//   Responses,

// });

const savesearchController = {
  addSave,
  getsavesearchById,
  DeleteSaveSearch
};

// routes
const routes = require('../SaveSearch/savesearch.routes')({
  savesearchController,
  router,
  makeExpressCallback,
});

module.exports = {
  savesearchController,
  savesearchService: {
    doSave,
    doGetsavesearchById
    
  },
  saveSearchRoutes: routes, 
}; 
