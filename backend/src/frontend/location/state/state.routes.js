module.exports = ({
  stateController,
  router,
  makeExpressCallback,
}) => {
  router.post('/add', makeExpressCallback(stateController.stateAdd));
  router.get('/viewAll', makeExpressCallback(stateController.getState));
  router.delete('/:id', makeExpressCallback(stateController.DeleteState));
  router.put('/:id', makeExpressCallback(stateController.UpdateState));
  router.put('/status/:id', makeExpressCallback(stateController.statusState));

  router.get('/:id', makeExpressCallback(stateController.EditState)); 

  return router;
};
