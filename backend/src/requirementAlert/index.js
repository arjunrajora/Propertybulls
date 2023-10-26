const router = require('express').Router();
const { Requirementalert, propertyTypes, Location, City, State } = require('../db');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');

const controller = require('./requirementalert.controller');


const {
  doGetRequirementalert,
  doSearchRequirementalert,
  doDeleteRequirement
} = require('./requirementalert.service');



const getRequirementalert = controller.getRequirementalert({
  BadRequestError,
  doGetRequirementalert,
  Requirementalert,
  propertyTypes,
  Location,
  City,
  State,

});


const searchRequirementalert = controller.searchRequirementalert({
  BadRequestError,
  Requirementalert,
  doSearchRequirementalert,
  propertyTypes, Location, City, State
});


// deleted Requirement
const deleteRequirement = controller.deleteRequirement({
  BadRequestError,
  Requirementalert,
  doDeleteRequirement,

});




const RequirementalertController = {
  getRequirementalert,
  searchRequirementalert,
  deleteRequirement

};




const routes = require('./requirementalert.routes')({
  RequirementalertController,
  router,
  makeExpressCallback,
});


module.exports = {
  RequirementalertController,
  RequirementalertService: {

    doGetRequirementalert,
    doSearchRequirementalert,
    doDeleteRequirement

  },
  RequirementalertRoutes: routes,
}; 