module.exports = ({
  SeoController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(SeoController.SeoAdd));
  router.get('/ViewAll', makeExpressCallback(SeoController.getSeo));
  router.delete('/:id', makeExpressCallback(SeoController.Seodelete));
  router.put('/:id', makeExpressCallback(SeoController.updateSeo));
  router.get('/:id', makeExpressCallback(SeoController.EditSeo)); 
  router.put('/status/:id', makeExpressCallback(SeoController.status)); 




  return router;
};
