module.exports = ({
  LocationController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(LocationController.addLocation));
  router.delete('/:id', makeExpressCallback(LocationController.deleteLocation));
  router.get('/viewAll', makeExpressCallback(LocationController.getLocation))
  router.put('/:id', makeExpressCallback(LocationController.updateLocation));
  router.get('/:id', makeExpressCallback(LocationController.getLocationById));
  router.put('/:id', makeExpressCallback(LocationController.updateLocationStatus));

  return router;
};
