const router = require('express').Router();

const { Subscribe, Subscription, Order, User, SaveOrder ,Project} = require('../../db');

const {
  doSubscribe,
  doCheckUserExist,
  doGetSubscription,
  doOrder,
  doGetSubscriptionconfirmation,
  doUpdateOrder,
  doGetRazorpayid,
  doGetSubscriptionPackage

} = require('./subscribe.service');

const makeExpressCallback = require('../../utils/express-callback');

const { BadRequestError } = require('../../utils/api-errors');
// controller
const controller = require('./subscribe.controller');

const { validateAddSubscribeData, validateUpdateSubscribeData } = require('./subscribe.validator');


// subscribeAdd
const subscribeAdd = controller.subscribeAdd({
  BadRequestError,
  doSubscribe,
  doCheckUserExist,
  validateAddSubscribeData
});

// subscriptionview
const getSubscription = controller.getSubscription({
  BadRequestError,
  doGetSubscription,
  Subscription
});

// subscription pkg Buy
const orderNow = controller.orderNow({
  BadRequestError,
  doOrder,
});

// subscription confirmation 
const getSubscriptionconfirmation = controller.getSubscriptionconfirmation({
  BadRequestError,
  doGetSubscriptionconfirmation,
  Order,
  Subscription,
  User
});


const getRazorpayid = controller.getRazorpayid({
  BadRequestError,
  doGetRazorpayid,
  Order,

});





// order Update
const updateOrder = controller.updateOrder({
  BadRequestError,
  doUpdateOrder,
  Order,
});

// my package view 
const getSubscriptionconPackage = controller.getSubscriptionconPackage({
  BadRequestError,
  doGetSubscriptionPackage,
  SaveOrder,
  Subscription,
  User,
  Project
});




const SubscribeController = {
  subscribeAdd,
  getSubscription,
  orderNow,
  getSubscriptionconfirmation,
  updateOrder,
  getRazorpayid,
  getSubscriptionconPackage
};

// routes
const routes = require('./subscribe.routes')({
  SubscribeController,
  router,
  makeExpressCallback,
});

module.exports = {
  SubscribeController,
  SubscribeService: {
    doSubscribe,
    doGetSubscription,
    doOrder,
    doGetSubscriptionconfirmation,
    doUpdateOrder,
    doGetRazorpayid,
    doGetSubscriptionPackage
  },
  ClintSubscribeRoutes: routes,
};