const router = require("express").Router();
// const {
//   JWT_ACCESS_TOKEN_SECRET,
//   ACCESS_TOKEN_EXPIRES_IN,
//   SIGN_OPTION,
//   EMAIL,
//   INVITATION_TOKEN_EXPIRES_IN,
// } = require("config");

const { Type } = require("../db");

const { validateAddType } = require("./type.validator");

const {
  doType,
  doGetType
} = require("./type.service");

const makeExpressCallback = require("../utils/express-callback");

const { BadRequestError } = require("../utils/api-errors");
// controller
const controller = require("./type.controller");
const typeAdd = controller.typeAdd({
   BadRequestError,
   doType,
  validateAddType,
 });

const getType = controller.getType({
  BadRequestError,
  doGetType,
});

// const Faqdelete = controller.Faqdelete({
//   BadRequestError,
//   doDeleteFaq,
// });

// const updateFaq = controller.updateFaq({
//   BadRequestError,
//   doUpdateFaq,
//   Faq,
//   validateUpdateFaq
// });

// const EditFaq = controller.EditFaq({
//   BadRequestError,
//   doEditFaq,
// });

// const status = controller.status({
//   BadRequestError,
//   doStatus,
//   Faq,
//   validateFaqStatus
// });

const TypeController = {
  typeAdd,
  getType
};

// routes
const routes = require("./type.routes")({
  TypeController,
  router,
  makeExpressCallback,
});

module.exports = {
  TypeController,
  TypeService: {
    doType,
    doGetType
  },
  TypeRoutes: routes,
};
