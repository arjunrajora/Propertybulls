module.exports = ({
  FacingController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(FacingController.PropertyFacingAdd));
  router.get('/viewAll', makeExpressCallback(FacingController.getFacing));
  router.delete('/:id', makeExpressCallback(FacingController.DeletePropertyFacing));
  router.put('/:id', makeExpressCallback(FacingController.updatePropertyFacing));
  router.put('/status/:id', makeExpressCallback(FacingController.status));

  return router;
};
