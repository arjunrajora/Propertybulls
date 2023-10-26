const router = require('express').Router();

const {
  Letter, Subscribe, Builder, Agent
} = require('../db');

const {
  doLetter,
  doGetLetter,
  doDeleteLetter,
  doUpdateLetter,
  doGetNewsletterpreviewbyid,
  doGetNewslettersubscribe,
  doGetNewsletterBuilder,
  doGetNewsletterAgent
} = require('./letter.service');

const makeExpressCallback = require('../utils/express-callback');

const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./letter.controller');

const { validateAddLetterData, validateUpdateLetterData } = require('./letter.validator');



const letterAdd = controller.letterAdd({
  BadRequestError,
  doLetter,
  validateAddLetterData
});

const getLetter = controller.getLetter({
  BadRequestError,
  doGetLetter,
});

const deleteLetter = controller.deleteLetter({
  BadRequestError,
  doDeleteLetter,
});

const updateLetter = controller.updateLetter({
  BadRequestError,
  doUpdateLetter,
  Letter,
  validateUpdateLetterData,

})
const getNewsletterpreviewbyid = controller.getNewsletterpreviewbyid({
  BadRequestError,
  doGetNewsletterpreviewbyid
});

// Newsletter Subscribe view 
const getNewsletterSubscribe = controller.getNewsletterSubscribe({
  BadRequestError,
  doGetNewslettersubscribe,
  Subscribe

});
// Newsletter Builder view 
const getNewsletterBuilder = controller.getNewsletterBuilder({
  BadRequestError,
  doGetNewsletterBuilder,
  Builder

});

// Newsletter Builder view 
const getNewsletterAgent = controller.getNewsletterAgent({
  BadRequestError,
  doGetNewsletterAgent,
  Agent

});


const LetterController = {
  letterAdd,
  getLetter,
  deleteLetter,
  updateLetter,
  getNewsletterpreviewbyid,
  getNewsletterSubscribe,
  getNewsletterBuilder,
  getNewsletterAgent

};





// routes
const routes = require('./letter.routes')({
  LetterController,
  router,
  makeExpressCallback,
});

module.exports = {
  LetterController,
  LetterService: {
    doLetter,
    doGetLetter,
    deleteLetter,
    doUpdateLetter,
    doGetNewsletterpreviewbyid,
    doGetNewslettersubscribe,
    doGetNewsletterBuilder,
    doGetNewsletterAgent

  },
  LetterRoutes: routes,
};