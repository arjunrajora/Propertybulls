const router = require("express").Router();

const { Shortlist,Property,propertyTypes,User,Role,propertydetails} = require("../../db");

const {
  doShortlist,
  doGetShortlist,
  doDeleteShortlist,
  doDeleteShortlistinproperty,
 doShortlistget
  // doGetShortlistById,

  
} = require("./shortlist.service");

const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("./shortlist.controller");
const shortlistAdd = controller.shortlistAdd({
  BadRequestError,
  doShortlist,
  
});

const getShortlist = controller.getShortlist({
  BadRequestError,
  doGetShortlist,
  Shortlist,
  Property,
  propertyTypes,User,Role,propertydetails
});

const deleteShortlist = controller.deleteShortlist({
  BadRequestError,
  doDeleteShortlist,
});

const Shortlistdeleteinproperty = controller.Shortlistdeleteinproperty({
  BadRequestError,
  doDeleteShortlistinproperty,
});


const Shortlistget = controller.Shortlistget({
  BadRequestError,
  doShortlistget,
});


const ShortlistController = {
  shortlistAdd,
  getShortlist,
  deleteShortlist,
  Shortlistdeleteinproperty,
  Shortlistget
};

// routes
const routes = require("./shortlist.routes")({
  ShortlistController,
  router,
  makeExpressCallback,
});

module.exports = {
  ShortlistController,
  ShortlistService: {
    doShortlist,
    doGetShortlist,
    doDeleteShortlist,
    doDeleteShortlistinproperty,
    doShortlistget
  },
  ClintShortlistRoutes: routes,
};
