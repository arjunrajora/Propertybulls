const router = require("express").Router();
const {
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
  EMAIL,
  INVITATION_TOKEN_EXPIRES_IN,
} = require("config");

const { Similarproject, propertyTypes } = require("../../db");

const {
  doGetSimilarproject,
  doGetSimilarprojectbytype,
  doGetSimilarprojectById
} = require("../../frontend/similarprojectmanager/similarproject.service");


const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("../../frontend/similarprojectmanager/similarproject.controller");





// similar project view by id
const getSimilarprojectById = controller.getSimilarprojectById({
  BadRequestError,
  doGetSimilarprojectById,
  propertyTypes
});


const getSimilarproject = controller.getSimilarproject({
  BadRequestError,
  doGetSimilarproject,
});


const Similarprojectbytype = controller.Similarprojectbytype({
  BadRequestError,
  doGetSimilarprojectbytype,
});



const SimilarprojectController = {
  getSimilarproject,
  Similarprojectbytype,
  getSimilarprojectById
};

// routes                                  
const routes = require("../../frontend/similarprojectmanager/similarproject.routes")({
  SimilarprojectController,
  router,
  makeExpressCallback,
});

module.exports = {
  SimilarprojectController,
  SimilarprojectService: {

    doGetSimilarproject,
    doGetSimilarprojectbytype,
    doGetSimilarprojectById

  },
  ClintSimilarprojectRoutes: routes,
};
