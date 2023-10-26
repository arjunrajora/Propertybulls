const fileUpload = require("../middlewares/fileUpload");

module.exports = ({
  advertisementsubscriptionController, 
  router,
  makeExpressCallback,
}) => {

  // router.post('/add', fileUpload.imageUpload.single("image"),makeExpressCallback(AdvertisementpackageController.addBuilder));
  router.delete('/:id', makeExpressCallback(advertisementsubscriptionController.deleteAdvertisementsubscription));
  router.post('/viewAllduration', makeExpressCallback(advertisementsubscriptionController.getDurationByBannerPosition));
  router.get('/viewAll', makeExpressCallback(advertisementsubscriptionController.getAdvertisementsubscription))
  router.get('/viewAllAdvertisement', makeExpressCallback(advertisementsubscriptionController.getAdvertisementPosition))
  router.get('/:page', makeExpressCallback(advertisementsubscriptionController.getBannerPageLocation))
  router.post('/add',fileUpload.imageUpload.single("banner"), makeExpressCallback(advertisementsubscriptionController.addAdvertisementsubscription));
  router.put('/:id', makeExpressCallback(advertisementsubscriptionController.updateAdvertisementPackage));
  router.post('/serchviewAll', makeExpressCallback(advertisementsubscriptionController.searchAdvertisementsubscription))
  router.put('/status/:id', makeExpressCallback(advertisementsubscriptionController.updateAdvertisementsubscriptionStatus));

  return router;
};
