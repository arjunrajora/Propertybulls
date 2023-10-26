module.exports = ({
    ProjectenquiryController,
    router,
    makeExpressCallback,
  }) => {
  
    router.post('/add', makeExpressCallback(ProjectenquiryController.projectenquiryAdd));
    router.post('/CheckMobile', makeExpressCallback(ProjectenquiryController.CheckUserExistOtp));
 
  

    return router;
  };
  