const router = require("express").Router();

const { State } = require("../../db");

const { validateAddState, validateUpdateState ,validateStatusState} = require("./state.validator");

const {
  doStateAdd,
  doGetState,
  doEditState,
  doUpdateState,
  doDeleteState,
  doStatusState
} = require("./state.service");

const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("./state.controller");
const stateAdd = controller.stateAdd({
  BadRequestError,
  doStateAdd,
  validateAddState,
});

const getState = controller.getState({
  BadRequestError,
  doGetState,
});

const DeleteState = controller.DeleteState({
  BadRequestError,
  doDeleteState,
});

const UpdateState = controller.UpdateState({
  BadRequestError,
  doUpdateState,
  State,
  validateUpdateState
});

const EditState = controller.EditState({
  BadRequestError,
  doEditState,
});




const statusState = controller.statusState({
  BadRequestError,
  State,
  doStatusState,
  validateStatusState,
});



const stateController = {
  stateAdd,
  getState,
  EditState,
  UpdateState,
  DeleteState,
  statusState
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
    doStateAdd,
    doGetState,
    doEditState,
    doUpdateState,
    doDeleteState,
    doStatusState
  },
  StateRoutes: routes,
};
