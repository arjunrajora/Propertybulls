const router = require('express').Router();
const { Contactinquiry, Project, Property, Customer, Location, User, City } = require('../db');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');

const controller = require('./contactinquiry.controller');


const {
  doGetContactinquiry,
  doSearchContactinquiry,
  doDeleteContactinquiry
} = require('./contactinquiry.service');



const getContactinquiry = controller.getContactinquiry({
  BadRequestError,
  doGetContactinquiry,
  Contactinquiry,
  Project,
  Property,
  Customer,
  Location,
  User,
  City


});


const searchContactinquiry = controller.searchContactinquiry({
  BadRequestError,
  Contactinquiry,
  doSearchContactinquiry,
  Property, Customer,
  Location, User, City
});


// Deleted Contact Inquiry
const Contactinquirydelete = controller.Contactinquirydelete({
  BadRequestError,
  doDeleteContactinquiry,
});



const ContactinquiryController = {
  getContactinquiry,
  searchContactinquiry,
  Contactinquirydelete

};




const routes = require('./contactinquiry.routes')({
  ContactinquiryController,
  router,
  makeExpressCallback,
});


module.exports = {
  ContactinquiryController,
  ContactinquiryService: {

    doGetContactinquiry,
    doSearchContactinquiry,
    doDeleteContactinquiry

  },
  ContactinquiryRoutes: routes,
}; 