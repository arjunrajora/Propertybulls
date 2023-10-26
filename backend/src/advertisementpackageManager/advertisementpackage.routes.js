const fileUpload = require("../middlewares/fileUpload");

module.exports = ({
  AdvertisementpackageController, 
  router,
  makeExpressCallback,
}) => {

  // router.post('/add', fileUpload.imageUpload.single("image"),makeExpressCallback(AdvertisementpackageController.addBuilder));
  router.delete('/:id', makeExpressCallback(AdvertisementpackageController.deleteAdvertisementPackage));
  router.get('/viewAll', makeExpressCallback(AdvertisementpackageController.getAdvertisementPackage))
  router.get('/viewAllBannerPosition', makeExpressCallback(AdvertisementpackageController.getBannerPosition))
  router.get('/:page', makeExpressCallback(AdvertisementpackageController.getBannerPageLocation))
  router.post('/add', makeExpressCallback(AdvertisementpackageController.addAdvertisementPackage));
  router.put('/:id', makeExpressCallback(AdvertisementpackageController.updateAdvertisementPackage));
  // router.put('/:id',fileUpload.imageUpload.single("image"),makeExpressCallback(AdvertisementpackageController.updateBuilder));
  // router.get('/:id', makeExpressCallback(AdvertisementpackageController.getBuilderById));
  // router.get('/Project/:id', makeExpressCallback(AdvertisementpackageController.getProject));
  router.put('/status/:id', makeExpressCallback(AdvertisementpackageController.updateAdvertisementPackageStatus));
  // router.put('/featured/:id', makeExpressCallback(AdvertisementpackageController.updateFeatured));

  return router;
};
