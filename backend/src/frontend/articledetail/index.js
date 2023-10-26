const router = require('express').Router();
const { Articledetail } = require('../../db');
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors');

// controller
const controller = require('./articledetail.controller');

const { doGetArticledetail, } = require('./articledetail.service');

const getArticledetail = controller.getArticledetail({
  BadRequestError,
  doGetArticledetail,
  Articledetail,
});


const ArticledetailController = {

  getArticledetail,

};

// routes
const routes = require('./articledetail.routes')({
  ArticledetailController,
  router,
  makeExpressCallback,
});

module.exports = {
  ArticledetailController,
  ArticledetailService: {

    doGetArticledetail,

  },
  ClintArticledetailRoutes: routes,
}; 
