const router = require("express").Router();

const { State } = require("../../../db");

const { validateAddState, validateUpdateState ,validateStatusState} = require("./state.validator");

const {

  doGetState,
 
} = require("./state.service");

const makeExpressCallback = require("../../../utils/express-callback");

const { BadRequestError } = require("../../../utils/api-errors");
// controller
const controller = require("./state.controller");


const getState = controller.getState({
  BadRequestError,
  doGetState,
});




const stateController = {
  getState,

};

// routes
const routes = require("./state.routes")({
  stateController,
  router,
  makeExpressCallback,
});

module.exports = {
  stateController,
  stateService: {
    
    doGetState,

  },
  StateclintRoutes: routes,
};
