const fileUpload = require("../middlewares/fileUpload");

module.exports = ({
  ArticleController,
  router,
  makeExpressCallback,
}) => {
  // router.post('/add', makeExpressCallback(ArticleController.addArticle));

   router.post('/add', fileUpload.imageUpload.single("image"), makeExpressCallback(ArticleController.addArticle));
  router.delete('/:id', makeExpressCallback(ArticleController.deleteArticle));
  router.get('/viewAll', makeExpressCallback(ArticleController.getArticle))
  // router.put('/:id', makeExpressCallback(ArticleController.updateArticle));
  router.put('/:id',fileUpload.imageUpload.single("image"),makeExpressCallback(ArticleController.updateArticle));

  router.get('/:id', makeExpressCallback(ArticleController.getArticleById));
  router.put('/status/:id', makeExpressCallback(ArticleController.updateArticleStatus));

  return router;
};
