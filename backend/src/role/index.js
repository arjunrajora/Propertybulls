const router = require('express').Router();
const { Role } = require('../db');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');

const controller = require('./role.controller');


const {
   doGetRole
  } = require('./role.service');



  const getRole = controller.getRole({
    BadRequestError,
    doGetRole,
    Role,
  });


  const RoleController = {
    getRole,
 
  };


  const routes = require('./role.routes')({
    RoleController,
    router,
    makeExpressCallback,
  });


  module.exports = {
    RoleController,
    RoleService: {
     
      doGetRole,
  
    },
    RoleRoutes: routes, 
  }; 