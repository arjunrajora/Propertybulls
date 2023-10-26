const router = require("express").Router();
// const {
//   JWT_ACCESS_TOKEN_SECRET,
//   ACCESS_TOKEN_EXPIRES_IN,
//   SIGN_OPTION,
//   EMAIL,
//   INVITATION_TOKEN_EXPIRES_IN,
// } = require("config");

const { Faq ,FaqCatgory} = require("../db");

const { validateAddFaq, validateUpdateFaq, validateFaqStatus } = require("./faq.validator");

const {
  doFaq,
  doGetFaq,
  doDeleteFaq,
  doUpdateFaq,
  doEditFaq,
  doStatus,
  doGetFaqCatgory,
  doUpdateFeatured,
  dogetFaqbyid
} = require("./faq.service");

const makeExpressCallback = require("../utils/express-callback");

const { BadRequestError } = require("../utils/api-errors");
// controller
const controller = require("./faq.controller");
const faqAdd = controller.faqAdd({
  BadRequestError,
  doFaq,
  validateAddFaq,
});

const getFaq = controller.getFaq({
  BadRequestError,
  doGetFaq,
});

const getFaqbyid = controller.getFaqbyid({
  BadRequestError,
  dogetFaqbyid,
});


const getFaqCatgory = controller.getFaqCatgory({
  BadRequestError,
  doGetFaqCatgory,
});
const Faqdelete = controller.Faqdelete({
  BadRequestError,
  doDeleteFaq,
});

const updateFaq = controller.updateFaq({
  BadRequestError,
  doUpdateFaq,
  Faq,
  validateUpdateFaq
});

const EditFaq = controller.EditFaq({
  BadRequestError,
  doEditFaq,
});
const updateFeatured = controller.updateFeatured({
  BadRequestError,
  doUpdateFeatured,
  // validateUpdateFeatured
});

const status = controller.status({
  BadRequestError,
  doStatus,
  Faq,
  validateFaqStatus
});

const FaqController = {
  faqAdd,
  getFaq,
  Faqdelete,
  updateFaq,
  EditFaq,
  status,
  getFaqCatgory,
  updateFeatured,
  getFaqbyid
};

// routes
const routes = require("./faq.routes")({
  FaqController,
  router,
  makeExpressCallback,
});

module.exports = {
  FaqController,
  FaqService: {
    doFaq,
    doGetFaq,
    doDeleteFaq,
    doUpdateFaq,
    doEditFaq,
    doStatus,
    doGetFaqCatgory,
    doUpdateFeatured,
    dogetFaqbyid
  },
  FaqRoutes: routes,
};
