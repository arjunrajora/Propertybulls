module.exports = ({
  EmailController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(EmailController.addEmail));
  router.delete('/:id', makeExpressCallback(EmailController.deleteEmail));
  router.get('/viewAll', makeExpressCallback(EmailController.getEmail))
  router.put('/:id', makeExpressCallback(EmailController.updateEmail));
  router.get('/:id', makeExpressCallback(EmailController.getEmailById));
  router.get('/description/:id', makeExpressCallback(EmailController.getEmaildescription));
  router.put('/status/:id', makeExpressCallback(EmailController.updateEmailStatus));

  return router;
};
