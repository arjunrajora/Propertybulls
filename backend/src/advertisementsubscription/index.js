const router = require('express').Router();
const { BannerPosition,Advertisement ,Advertisementsubscription} = require('../db');
const moment = require('moment');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./advertisementsubscription.controller');
const {
  validateAdvertisementPackageCreateData,
  validateUpdateAdvertisementPackageStatus
} = require('./advertisementsubscription.validator');
const {
  imageUpload
} = require('../middlewares/fileUpload');
const {
  doGetAdvertisementPackage,
  doGetBannerPositionByPage,
  doAdvertisementsubscription,
  doGetAdvertisementsubscription,
  doUpdateAdvertisementPackage,
  doDeleteAdvertisementsubscription,
  doUpdateAdvertisementsubscriptionStatus,
  doCheckAdvertisementPackageLocation,
  doSearchAdvertisementsubscription,
  doGetDurationByBannerPosition
} = require('./advertisementsubscription.service');


const updateAdvertisementPackage = controller.updateAdvertisementPackage({
  BadRequestError,
  doUpdateAdvertisementPackage,
  
});
const updateAdvertisementsubscriptionStatus = controller.updateAdvertisementsubscriptionStatus({
  BadRequestError,
  Advertisement,
  doUpdateAdvertisementsubscriptionStatus,
  validateUpdateAdvertisementPackageStatus
  
});
const deleteAdvertisementsubscription = controller.deleteAdvertisementsubscription({
  BadRequestError,
  doDeleteAdvertisementsubscription,
  
});
const getAdvertisementPosition = controller.getAdvertisementPosition({
  BadRequestError,
  BannerPosition,
  doGetAdvertisementPackage
});
const searchAdvertisementsubscription = controller.searchAdvertisementsubscription({
  BadRequestError,
    doSearchAdvertisementsubscription,
    Advertisement,
  BannerPosition,
  Advertisementsubscription
});





const addAdvertisementsubscription = controller.addAdvertisementsubscription({
  BadRequestError,
  Advertisementsubscription,
  
  doAdvertisementsubscription,
});
const getBannerPageLocation = controller.getBannerPageLocation({
  BadRequestError,
  Advertisement,
  BannerPosition,
  doGetBannerPositionByPage

});
const getDurationByBannerPosition = controller.getDurationByBannerPosition({
  BadRequestError,
  Advertisement,
  doGetDurationByBannerPosition

});
const getAdvertisementsubscription = controller.getAdvertisementsubscription({
  BadRequestError,
  doGetAdvertisementsubscription,
  Advertisement,
  Advertisementsubscription,
  BannerPosition
});
// const searchBuilder = controller.searchBuilder({
//   BadRequestError,
//   Builder,
//   doSearchBuilder,
//   property,
//   Location
// });
// const deleteBuilder = controller.deleteBuilder({
//   BadRequestError,
//   doDeleteBuilder,
//   doCheckProjectbyBuilder,
//   property 
// });
// const getBuilderById = controller.getBuilderById({
//   BadRequestError,
//   doGetBuilderById
// });
// const updateBuilderStatus = controller.updateBuilderStatus({
//   BadRequestError,
//   Builder,
//   doUpdateBuilderStatus,
//   validateUpdateBuilderStatus
// });
// const updateFeatured = controller.updateFeatured({
//   BadRequestError,
//   Builder,
//   doUpdateFeatured,
//   // validateUpdateFeatured
// });

const advertisementsubscriptionController= {
  getAdvertisementPosition,
  getBannerPageLocation,
  addAdvertisementsubscription,
  getAdvertisementsubscription,
  updateAdvertisementPackage,
  deleteAdvertisementsubscription,
  updateAdvertisementsubscriptionStatus,
  searchAdvertisementsubscription,
  getDurationByBannerPosition
};

// routes
const routes = require('./advertisementsubscription.routes')({
  advertisementsubscriptionController,
  router,
  makeExpressCallback,
});

module.exports = {
  advertisementsubscriptionController,
  advertisementsubscriptionControllerService: {
    doGetAdvertisementPackage,
    doGetBannerPositionByPage,
    doAdvertisementsubscription,
    doGetAdvertisementsubscription,
    doUpdateAdvertisementPackage,
    doDeleteAdvertisementsubscription,
    doUpdateAdvertisementsubscriptionStatus,
    doCheckAdvertisementPackageLocation,
    doSearchAdvertisementsubscription,
    getDurationByBannerPosition
  },
  advertisementsubscription: routes, 
}; 
