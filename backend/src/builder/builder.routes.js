const fileUpload = require("../middlewares/fileUpload");

module.exports = ({
  BuilderController, 
  router,
  makeExpressCallback,
}) => {

  router.post('/add', fileUpload.imageUpload.single("image"),makeExpressCallback(BuilderController.addBuilder));
  router.delete('/:id', makeExpressCallback(BuilderController.deleteBuilder));
  router.get('/viewAll', makeExpressCallback(BuilderController.getBuilder))
  router.post('/searchAll', makeExpressCallback(BuilderController.searchBuilder));
  // router.put('/:id', makeExpressCallback(BuilderController.updateBuilder));
  router.put('/:id',fileUpload.imageUpload.single("image"),makeExpressCallback(BuilderController.updateBuilder));
  router.get('/:id', makeExpressCallback(BuilderController.getBuilderById));
  router.get('/Project/:id', makeExpressCallback(BuilderController.getProject));
  router.put('/status/:id', makeExpressCallback(BuilderController.updateBuilderStatus));
  router.put('/featured/:id', makeExpressCallback(BuilderController.updateFeatured));

  return router;
};
