const router = require('express').Router();
const { BannerPosition,Advertisement } = require('../db');
const moment = require('moment');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./advertisementpackage.controller');
const {
  validateAdvertisementPackageCreateData,
  validateUpdateAdvertisementPackageStatus
} = require('./advertisementpackage.validator');
const {
  imageUpload
} = require('../middlewares/fileUpload');
const {
  doGetBannerPosition,
  doGetBannerPositionByPage,
  doAdvertisementPackage,
  doGetAdvertisementPackage,
  doUpdateAdvertisementPackage,
  doDeleteAdvertisementPackage,
  doUpdateAdvertisementPackageStatus,
  doCheckAdvertisementPackageLocation
} = require('./advertisementpackage.service');


const updateAdvertisementPackage = controller.updateAdvertisementPackage({
  BadRequestError,
  doUpdateAdvertisementPackage,
  
});
const updateAdvertisementPackageStatus = controller.updateAdvertisementPackageStatus({
  BadRequestError,
  Advertisement,
  doUpdateAdvertisementPackageStatus,
  validateUpdateAdvertisementPackageStatus
  
});
const deleteAdvertisementPackage = controller.deleteAdvertisementPackage({
  BadRequestError,
  doDeleteAdvertisementPackage,
  
});
const getBannerPosition = controller.getBannerPosition({
  BadRequestError,
  BannerPosition,
  doGetBannerPosition

});
const addAdvertisementPackage = controller.addAdvertisementPackage({
  BadRequestError,
  validateAdvertisementPackageCreateData,
  doAdvertisementPackage,
  doCheckAdvertisementPackageLocation,
  Advertisement

});
const getBannerPageLocation = controller.getBannerPageLocation({
  BadRequestError,
  BannerPosition,
  doGetBannerPositionByPage

});
const getAdvertisementPackage = controller.getAdvertisementPackage({
  BadRequestError,
  doGetAdvertisementPackage,
  Advertisement,
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

const AdvertisementpackageController= {
  getBannerPosition,
  getBannerPageLocation,
  addAdvertisementPackage,
  getAdvertisementPackage,
  updateAdvertisementPackage,
  deleteAdvertisementPackage,
  updateAdvertisementPackageStatus
};

// routes
const routes = require('./advertisementpackage.routes')({
  AdvertisementpackageController,
  router,
  makeExpressCallback,
});

module.exports = {
  AdvertisementpackageController,
  AdvertisementpackageControllerService: {
    doGetBannerPosition,
    doGetBannerPositionByPage,
    doAdvertisementPackage,
    doGetAdvertisementPackage,
    doUpdateAdvertisementPackage,
    doDeleteAdvertisementPackage,
    doUpdateAdvertisementPackageStatus,
    doCheckAdvertisementPackageLocation
  },
  AdvertisementPackage: routes, 
}; 
