module.exports = ({
  RequirementController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(RequirementController.addRequirement));
  router.post('/id', makeExpressCallback(RequirementController.getRequirementbyId))
  router.post('/category', makeExpressCallback(RequirementController.getRequirementsbycategory))
  router.delete('/:id', makeExpressCallback(RequirementController.deleteRequirement));
  router.get('/viewAll', makeExpressCallback(RequirementController.getRequirements))
  return router;
};
