module.exports = ({
  propertyTypesController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(propertyTypesController.PropertyTypeAdd));
  router.get('/viewAll', makeExpressCallback(propertyTypesController.getType));
  router.delete('/:id', makeExpressCallback(propertyTypesController.DeletePropertyType));
  router.put('/:id', makeExpressCallback(propertyTypesController.updatePropertyType));
  router.put('/status/:id', makeExpressCallback(propertyTypesController.status));

  return router;
};
