module.exports = ({
    ShortlistController,
    router,
    makeExpressCallback,
  }) => {
  
    router.post('/add', makeExpressCallback(ShortlistController.shortlistAdd));
    router.post('/viewAll',makeExpressCallback(ShortlistController.getShortlist));
    router.get('/view',makeExpressCallback(ShortlistController.Shortlistget));
    router.delete('/:id',makeExpressCallback(ShortlistController.deleteShortlist));
    router.post('/delete',makeExpressCallback(ShortlistController.Shortlistdeleteinproperty));
    return router;
  };
  