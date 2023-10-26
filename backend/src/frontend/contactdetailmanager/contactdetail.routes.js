module.exports = ({
  ContactdetailController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(ContactdetailController.contactdetailAdd));
  router.post('/contactadd', makeExpressCallback(ContactdetailController.Contactnow));
  router.post('/alert', makeExpressCallback(ContactdetailController.Alertrequrie));
  router.post('/id', makeExpressCallback(ContactdetailController.GetcontactDetailbycus_id));
  router.delete('/:id', makeExpressCallback(ContactdetailController.deletecontactnow));





  return router;
};
