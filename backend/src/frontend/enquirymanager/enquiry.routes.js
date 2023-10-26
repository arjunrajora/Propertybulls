module.exports = ({
    EnquiryController,
    router,
    makeExpressCallback,
  }) => {
  
    router.post('/add', makeExpressCallback(EnquiryController.enquiryAdd));
 
  

    return router;
  };
  