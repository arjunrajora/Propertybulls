module.exports = ({
  FeaturesController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(FeaturesController.PropertyfeaturesAdd));
  router.get('/viewAll', makeExpressCallback(FeaturesController.getFeatures));
  router.delete('/:id', makeExpressCallback(FeaturesController.DeletePropertyFeatures));
  router.put('/:id', makeExpressCallback(FeaturesController.updatePropertyFeatures));
  router.put('/status/:id', makeExpressCallback(FeaturesController.status));

  return router;
};
