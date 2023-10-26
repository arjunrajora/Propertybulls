


module.exports = ({
    ArticledetailController,
    router,
    makeExpressCallback,
  }) => {
    
    router.post('/viewAll', makeExpressCallback(ArticledetailController.getArticledetail))
  
  
    return router;
  };
  