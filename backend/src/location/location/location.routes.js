module.exports = ({
  LocationController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(LocationController.addLocation));
  router.delete('/:id', makeExpressCallback(LocationController.deleteLocation));
  router.get('/viewAll', makeExpressCallback(LocationController.getLocation));
  router.get('/viewCity', makeExpressCallback(LocationController.getCity));

  // router.post('/search',makeExpressCallback(LocationController.searchLocation))
  router.post('/search', makeExpressCallback(LocationController.searchLocation))
  router.put('/:id', makeExpressCallback(LocationController.updateLocation));
  router.get('/:id', makeExpressCallback(LocationController.getLocationById));
  router.put('/status/:id', makeExpressCallback(LocationController.updateLocationStatus));

  return router;
};
