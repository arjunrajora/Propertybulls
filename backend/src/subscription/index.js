const router = require("express").Router();
const { Subscription, Order, User, SaveOrder, Role } = require("../db");
const makeExpressCallback = require("../utils/express-callback");
const { BadRequestError } = require("../utils/api-errors");
const {
  doSubscription,
  doGetSubscription,
  doGetSubscriptionById,
  doUpdateSubscription,
  doGetSubscriptionPackage,
  doGetRole,
  doDeleteSubscription,
  doSearchSubscription
} = require("./subscription.service");


// const { validateAddCityData,
//   validateUpdateCityData,
//   validateUpdateStatus

// } = require("./city.validator");




// // controller
const controller = require("./subscription.controller");
const subscriptionAdd = controller.subscriptionAdd({
  BadRequestError,
  doSubscription,
});

//  View Subscription
const getSubscription = controller.getSubscription({
  BadRequestError,
  doGetSubscription,
  doSubscription,
  Role,
  Subscription,
});

// const deleteCity = controller.deleteCity({
//   BadRequestError,
//   doDeleteCity,
// });
// update Subscription
const updateSubscription = controller.updateSubscription({
  BadRequestError,
  doUpdateSubscription,
  Subscription,
});
const getSubscriptionById = controller.getSubscriptionById({
  BadRequestError,
  Subscription,
  doGetSubscriptionById
});

// subscription
const getSubscriptionPackage = controller.getSubscriptionPackage({
  BadRequestError,
  SaveOrder,
  User,
  Subscription,
  Role,
  doGetSubscriptionPackage,

});

// search Subscription
const searchSubscription = controller.searchSubscription({
  BadRequestError,
  SaveOrder,
  User,
  Subscription,
  Role,
  doSearchSubscription,

});


const getRole = controller.getRole({
  BadRequestError,
  Role,
  doGetRole,

});

// delete subscription
const deleteSubscription = controller.deleteSubscription({
  BadRequestError,
  doDeleteSubscription,

});



const SubscriptionController = {
  subscriptionAdd,
  getSubscription,
  getSubscriptionById,
  updateSubscription,
  getSubscriptionPackage,
  getRole,
  deleteSubscription,
  searchSubscription

};

// routes
const routes = require("./subscription.routes")({
  SubscriptionController,
  router,
  makeExpressCallback,
});

module.exports = {
  SubscriptionController,
  SubscriptionService: {
    doSubscription,
    doGetSubscription,
    doGetSubscriptionById,
    doUpdateSubscription,
    doGetSubscriptionPackage,
    doGetRole,
    doDeleteSubscription,
    doSearchSubscription
  },
  SubscriptionRoutes: routes,
};
