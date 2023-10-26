module.exports = ({
  FaqController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(FaqController.faqAdd));
  router.get('/viewAll', makeExpressCallback(FaqController.getFaq));
  router.delete('/:id', makeExpressCallback(FaqController.Faqdelete));
  router.put('/:id', makeExpressCallback(FaqController.updateFaq));
  router.get('/viewAllCatgory', makeExpressCallback(FaqController.getFaqCatgory)); 
  router.put('/status/:id', makeExpressCallback(FaqController.status));
  router.put('/featured/:id', makeExpressCallback(FaqController.updateFeatured));
  router.get('/description/:id', makeExpressCallback(FaqController.getFaqbyid));

  return router;
};
