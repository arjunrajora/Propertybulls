module.exports = ({
  ContactinquiryController,
  router,
  makeExpressCallback,
}) => {

  router.get('/viewAll', makeExpressCallback(ContactinquiryController.getContactinquiry))
  router.post('/search', makeExpressCallback(ContactinquiryController.searchContactinquiry))
  router.delete('/:id', makeExpressCallback(ContactinquiryController.Contactinquirydelete));


  return router;

}