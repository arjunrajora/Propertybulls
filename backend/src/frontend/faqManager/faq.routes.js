module.exports = ({
  FaqController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(FaqController.faqAdd));
  router.get('/viewAll', makeExpressCallback(FaqController.getFaq));
  router.delete('/:id', makeExpressCallback(FaqController.Faqdelete));
  router.put('/:id', makeExpressCallback(FaqController.updateFaq));
  router.post('/viewCatgory/id', makeExpressCallback(FaqController.getFaqCatgorybyid)); 
  router.put('/status/:id', makeExpressCallback(FaqController.status));
  router.post('/url', makeExpressCallback(FaqController.getFaqbyurl)); 
  router.put('/featured/:id', makeExpressCallback(FaqController.updateFeatured));

  return router;
};
