
const fileUpload = require("../../middlewares/fileUpload");


module.exports = ({
  ServiceProviderController,
  router,
  makeExpressCallback,
}) => {



  router.post('/add', fileUpload.imageUpload.single("company_logo"), makeExpressCallback(ServiceProviderController.addServiceProvider));

  router.delete('/:id', makeExpressCallback(ServiceProviderController.deleteServiceProvider));
  router.get('/viewAll', makeExpressCallback(ServiceProviderController.getServiceProvider))
  router.post('/searchAll', makeExpressCallback(ServiceProviderController.searchServiceProvider));
  // router.put('/:id', makeExpressCallback(ServiceProviderController.updateServiceProvider));
  router.put('/service/:id', fileUpload.imageUpload.single("company_logo"), makeExpressCallback(ServiceProviderController.updateServiceProvider));

  router.get('/:id', makeExpressCallback(ServiceProviderController.getServiceProviderById));
  router.put('/status/:id', makeExpressCallback(ServiceProviderController.updateServiceProviderStatus));

  return router;
};
