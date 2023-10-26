module.exports = ({
  RequirementalertController,
  router,
  makeExpressCallback,
}) => {

  router.get('/viewAll', makeExpressCallback(RequirementalertController.getRequirementalert))
  router.post('/search', makeExpressCallback(RequirementalertController.searchRequirementalert))
  router.delete('/:id', makeExpressCallback(RequirementalertController.deleteRequirement));



  return router;

}