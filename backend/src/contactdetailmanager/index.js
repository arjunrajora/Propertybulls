const router = require('express').Router();
const {
  Property,
  contactnow
} = require('../../db');

const {
  doContactdetail,
  doContactnow,
  doAlert,
  doGetcontactDetailbycus_id,
  doDeleteContactnow
 
} = require('./contactdetail.service');

const makeExpressCallback = require('../../utils/express-callback');

const { BadRequestError } = require('../../utils/api-errors');
// controller
const controller = require('./contactdetail.controller');
const{
  validateContactnow
}= require("./contactdetail.validator")
const Contactnow = controller.Contactnow({
  BadRequestError,
  doContactnow,
  doAlert,
  validateContactnow

});



const contactdetailAdd = controller.contactdetailAdd({
  BadRequestError,
  doContactdetail,

});
const deletecontactnow = controller.deletecontactnow({
  BadRequestError,
  doDeleteContactnow,

});
const Alertrequrie = controller.Alertrequrie({
  BadRequestError,
  doAlert,

});
const GetcontactDetailbycus_id = controller.GetcontactDetailbycus_id({
  BadRequestError,
  doGetcontactDetailbycus_id,
  contactnow,
  Property
});


const ContactdetailController = {
    contactdetailAdd,
    Contactnow,
    Alertrequrie,
    GetcontactDetailbycus_id,
deletecontactnow
};

// routes
const routes = require('./contactdetail.routes')({
  ContactdetailController,
  router,
  makeExpressCallback,
});

module.exports = {
  ContactdetailController,
  ContactdetailService: {
    doContactdetail,
    doContactnow,
    doAlert,
    doGetcontactDetailbycus_id,
    doDeleteContactnow
  },
  ClintContactdetailRoutes: routes, 
};