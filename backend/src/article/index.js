const router = require('express').Router();
const { Article } = require('../db');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');
const {
  imageUpload
} = require('../middlewares/fileUpload');
// controller
const controller = require('./article.controller');
const {
  validateArticleCreateData,
  validateArticleUpdateData,
  validateUpdateArticleStatus
} = require('./article.validator');
const {
  doArticle,
  doGetArticle,
  doUpdateArticle,
  doDeleteArticle,
  doGetArticleById,
  doUpdateArticleStatus
} = require('./article.service');

const addArticle = controller.addArticle({
  BadRequestError,
  doArticle,
  validateArticleCreateData,
  imageUpload
});
const getArticle = controller.getArticle({
  BadRequestError,
  doGetArticle,
  Article,
});
const updateArticle = controller.updateArticle({
  BadRequestError,
  Article,
  validateArticleUpdateData,
  doUpdateArticle,
});
const deleteArticle = controller.deleteArticle({
  BadRequestError,
  doDeleteArticle
});
const getArticleById = controller.getArticleById({
  BadRequestError,
  doGetArticleById
});
const updateArticleStatus = controller.updateArticleStatus({
  BadRequestError,
  Article,
  doUpdateArticleStatus,
  validateUpdateArticleStatus
});

const ArticleController = {
  addArticle,
  getArticle,
  updateArticle,
  deleteArticle, 
  getArticleById,
  updateArticleStatus
};

// routes
const routes = require('./article.routes')({
  ArticleController,
  router,
  makeExpressCallback,
});

module.exports = {
  ArticleController,
  ArticleService: {
    doArticle,
    doGetArticle,
    doUpdateArticle,
    doDeleteArticle,
    doGetArticleById,
    doUpdateArticleStatus
  },
  ArticleRoutes: routes, 
}; 
