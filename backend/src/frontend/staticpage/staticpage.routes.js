

module.exports = ({
    StaticpageController,
    router,
    makeExpressCallback,
  }) => {
    
    router.get('/viewAboutus', makeExpressCallback(StaticpageController.getAboutus));
    router.get('/viewHelp', makeExpressCallback(StaticpageController.getHelp));
    router.get('/viewPrivacy', makeExpressCallback(StaticpageController.getPrivacy));
    router.get('/viewTerms&Conditions',makeExpressCallback(StaticpageController.getTerms));


  
  
    return router;
  };
  