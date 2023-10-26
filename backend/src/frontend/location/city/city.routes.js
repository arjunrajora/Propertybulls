module.exports = ({
    CityController,
    router,
    makeExpressCallback,
  }) => {
  
    router.post('/add', makeExpressCallback(CityController.cityAdd));
    router.post('/cityAdd', makeExpressCallback(CityController.addQualification));
    router.get('/viewAll',makeExpressCallback(CityController.getCity));
    router.delete('/:id',makeExpressCallback(CityController.deleteCity));
    router.put('/:id',makeExpressCallback(CityController.updateCity));
    router.get('/:id',makeExpressCallback(CityController.getCityById));


    return router;
  };
  