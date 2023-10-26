

module.exports = ({
  PropertydetailController,
  router,
  makeExpressCallback,
}) => {
  
  router.get('/propertyType', makeExpressCallback(PropertydetailController.getPropertyType))

  router.post('/viewAll', makeExpressCallback(PropertydetailController.getPropertydetail))
  router.post('/viewuser', makeExpressCallback(PropertydetailController.getview))
  router.get('/:url', makeExpressCallback(PropertydetailController.getPropertydetailById))

  return router;
};
