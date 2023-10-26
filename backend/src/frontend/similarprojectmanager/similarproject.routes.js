module.exports = ({
  SimilarprojectController,
  router,
  makeExpressCallback,
}) => {

  router.get('/viewAll', makeExpressCallback(SimilarprojectController.getSimilarproject));
  // router.get('/:id', makeExpressCallback(SimilarprojectController.Similarprojectbytype));
  router.post('/view', makeExpressCallback(SimilarprojectController.getSimilarprojectById))





  return router;
};
