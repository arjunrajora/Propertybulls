module.exports = ({
  TypeController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(TypeController.typeAdd));
  router.get('/viewAll', makeExpressCallback(TypeController.getType));
  // router.delete('/:id', makeExpressCallback(FaqController.Faqdelete));
  // router.put('/:id', makeExpressCallback(FaqController.updateFaq));
  // router.get('/:id', makeExpressCallback(FaqController.EditFaq)); 
  // router.put('/status/:id', makeExpressCallback(FaqController.status));

  return router;
};
