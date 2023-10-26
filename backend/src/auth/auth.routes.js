const fileUpload = require("../middlewares/fileUpload");

module.exports = ({
  AuthController,
  router,
  makeExpressCallback,
}) => {
  router.post('/frontregister', makeExpressCallback(AuthController.frontregister));
  router.post('/register', makeExpressCallback(AuthController.register));
  router.post('/login', makeExpressCallback(AuthController.login));
  router.post('/front/login', makeExpressCallback(AuthController.frontTologin));
  router.post('/MobileToRegister', makeExpressCallback(AuthController.MobileToRegister));
  router.post('/MobileTologin', makeExpressCallback(AuthController.loginToMobile));
  router.get('/:id', makeExpressCallback(AuthController.Getbyid));
  router.put('/changepassword/:id', makeExpressCallback(AuthController.updatePasssword));
  // router.put('/updateprofile/:id', makeExpressCallback(AuthController.EditUserProfile));
  router.put('/updateprofile/:id',fileUpload.imageUpload.single("Image"),makeExpressCallback(AuthController.EditUserProfile));
  router.post('/forget/password', makeExpressCallback(AuthController.forgetPassword));

 router.put('/:id',fileUpload.imageUpload.single("Image"),makeExpressCallback(AuthController.updateUser));
 router.post('/remarkotp',makeExpressCallback(AuthController.remarkotp));

  return router;
};
   