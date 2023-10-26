const router = require('express').Router();

const {
  Seo
} = require('../db');

const {
  validateAddSeo,
  validateUpdatSeo,
  validatestatus
} = require('./seo.validator');


const {
doAddSeo,
doGetSeo,
doEditSeo,
doUpdateSeo,
doDeleteSeo,
dostatus
} = require('./seo.service');

const makeExpressCallback = require('../utils/express-callback');

const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./seo.controller');
const SeoAdd = controller.SeoAdd({
  BadRequestError,
 doAddSeo,
 validateAddSeo
  
});

const getSeo = controller.getSeo({
  BadRequestError,
  doGetSeo
  // 

});

const Seodelete = controller.Seodelete({
  BadRequestError,
  doDeleteSeo,

});



const updateSeo = controller.updateSeo({
  BadRequestError,
  doUpdateSeo,
  validateUpdatSeo,
    Seo

});

const EditSeo = controller.EditSeo({
  BadRequestError,
  doEditSeo,

});

const status = controller.status({
  BadRequestError,
  dostatus,
validatestatus
});
const SeoController = {
SeoAdd,
getSeo,
EditSeo,
updateSeo,Seodelete,status

};

// routes
const routes = require('./seo.routes')({
  SeoController,
  router,
  makeExpressCallback,
});

module.exports = {
  SeoController,
  SeoService: {
    doAddSeo,
  doGetSeo,
  doEditSeo,
  doUpdateSeo,
  doDeleteSeo,
  dostatus
  
  },
  SeoRoutes: routes, 
}; 
