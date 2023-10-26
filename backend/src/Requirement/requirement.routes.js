module.exports = ({
  RequirementController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(RequirementController.addRequirement));
  router.delete('/:id', makeExpressCallback(RequirementController.deleteRequirement));
  router.get('/viewAll', makeExpressCallback(RequirementController.getRequirement))
  router.put('/:id', makeExpressCallback(RequirementController.updateRequirement));
  router.get('/:id', makeExpressCallback(RequirementController.getRequirementById));
  router.put('/status/:id', makeExpressCallback(RequirementController.updateRequirementStatus));
  router.post('/search', makeExpressCallback(RequirementController.searchRequirement))




  return router;
};
