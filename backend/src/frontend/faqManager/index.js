const router = require("express").Router();
const { Faq ,FaqCatgory} = require("../../db");

const { validateAddFaq, validateUpdateFaq, validateFaqStatus } = require("./faq.validator");

const {
  doGetFaq,
  dogetFaq,
  doGetFaqCatgorybyid,

  
} = require("./faq.service");

const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("./faq.controller");


const getFaq = controller.getFaq({
  BadRequestError,
  FaqCatgory,
  Faq,
  doGetFaq,
});
const getFaqCatgorybyid = controller.getFaqCatgorybyid({
  BadRequestError,
  doGetFaqCatgorybyid,
  FaqCatgory,
  Faq,
});




const getFaqbyurl = controller.getFaqbyurl({
  BadRequestError,
  dogetFaq,
  FaqCatgory,
  Faq
});



const FaqController = {
  getFaq,
  getFaqbyurl,
  getFaqCatgorybyid,

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
    doGetFaq,
    dogetFaq,
    doGetFaqCatgorybyid,
  },
  faqclintRoutes: routes,
};
