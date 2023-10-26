const fileUpload = require("../../middlewares/fileUpload");


module.exports = ({
  ServiceCategoryController,
  router,
  makeExpressCallback,
}) => {

 
  router.post('/add',fileUpload.imageUpload.single("image"),makeExpressCallback(ServiceCategoryController.addServiceCategory));
  router.delete('/:id', makeExpressCallback(ServiceCategoryController.deleteServiceCategory));
  router.get('/viewAll', makeExpressCallback(ServiceCategoryController.getServiceCategory));
  router.put('/:id',fileUpload.imageUpload.single("image"),makeExpressCallback(ServiceCategoryController.updateServiceCategory));

  router.get('/:id', makeExpressCallback(ServiceCategoryController.getServiceCategoryById));
  router.put('/status/:id', makeExpressCallback(ServiceCategoryController.updateServiceCategoryStatus));

  return router;
};
