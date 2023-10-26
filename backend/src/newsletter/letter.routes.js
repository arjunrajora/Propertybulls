module.exports = ({
  LetterController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(LetterController.letterAdd));
  router.get('/viewAll', makeExpressCallback(LetterController.getLetter));
  router.delete('/:id', makeExpressCallback(LetterController.deleteLetter));
  router.put('/:id', makeExpressCallback(LetterController.updateLetter));
  router.get('/newsletter/:id/', makeExpressCallback(LetterController.getNewsletterpreviewbyid));
  router.get('/SubscribeView', makeExpressCallback(LetterController.getNewsletterSubscribe));
  router.get('/BuilderView', makeExpressCallback(LetterController.getNewsletterBuilder));
  router.get('/AgentView', makeExpressCallback(LetterController.getNewsletterAgent));




  return router;
};
