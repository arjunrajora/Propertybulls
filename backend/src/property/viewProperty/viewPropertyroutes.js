
const fileUpload = require("../../middlewares/fileUpload");



module.exports = ({
  propertyController,
  router,
  makeExpressCallback,
}) => {

  // router.post('/proadd', makeExpressCallback(propertyController.add));
  // router.post('/add', makeExpressCallback(propertyController.newAddproperty));

  router.get('/viewAll', makeExpressCallback(propertyController.GetProperty));
  router.get('/viewPropertytypes', makeExpressCallback(propertyController.getPropertytype));

  router.get('/propertyimg', makeExpressCallback(propertyController.getPropertyimgById));
  router.delete('/:id', makeExpressCallback(propertyController.DeleteProperty));

  // router.put('/:id', fileUpload.imageUpload.array('img', 6), makeExpressCallback(propertyController.updateProperty));
  router.put('/:id', fileUpload.imageUpload.fields([{ name: 'img' }, { name: 'featureimage' }, { name: 'floor_img' }]), makeExpressCallback(propertyController.updateProperty));


  router.put('/status/:id', makeExpressCallback(propertyController.status));

  // router.post('/propertyadd', makeExpressCallback(propertyController.PropertyAdd));
  // router.post('/propertyAdd', fileUpload.upload.array('img', 6), makeExpressCallback(propertyController.PropertyAdd));
  router.post('/propertyAdd', fileUpload.upload.fields([{ name: 'img' }, { name: 'featureimage' }, { name: 'floor_img' }]), makeExpressCallback(propertyController.PropertyAdd));

  router.post('/searchAll', makeExpressCallback(propertyController.searchProperty));
  router.get('/details/:id', makeExpressCallback(propertyController.getPropertybyid));
  router.put('/description/:id', makeExpressCallback(propertyController.updateDescription));
  router.put('/featured/:id', makeExpressCallback(propertyController.updateFeatured));



  return router;
};
