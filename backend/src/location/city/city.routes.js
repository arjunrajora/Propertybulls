module.exports = ({
  CityController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(CityController.cityAdd));
  router.get('/viewAll', makeExpressCallback(CityController.getCity));
  router.get('/viewState', makeExpressCallback(CityController.getState));

  router.delete('/:id', makeExpressCallback(CityController.deleteCity));
  router.put('/:id', makeExpressCallback(CityController.updateCity));
  // router.get('/:id',makeExpressCallback(CityController.getCityById));
  router.put('/status/:id', makeExpressCallback(CityController.updateCityStatus));
  router.post('/search', makeExpressCallback(CityController.searchCity))

  return router;
};
