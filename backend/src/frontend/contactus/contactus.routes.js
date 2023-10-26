

module.exports = ({
    ContactusController,
    router,
    makeExpressCallback,
  }) => {
    
    router.get('/viewContactus', makeExpressCallback(ContactusController.getContactus));
  


  
  
    return router;
  };
  