console.log('nest');
const router = require('express').Router();
const {
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
  EMAIL,
  INVITATION_TOKEN_EXPIRES_IN,
} = require('config'); 

const {
  User,
  Role
} = require('../db');

const emailTransporter = require('../utils/email');

const {
  doRegister,
  doLogin,
  doCheckUserExist,
  doGetbyid,
  doUpdateUser,
  doupdatepassword,
  dofrontRegister,
  doEditUserProfile,
  doMobile,
  doCheckUserExistMobile,
  doMobileToLogin,
  doCheckUserExistOtp,
  doremark,
  doCheckUser,
  // dofrogetpassword,
  dofrontLogin,
  doForgetPassword,
} = require('./auth.service');

const {
  generateJWT,
  verifyJWT,
} = require('../utils/jwt');

const { subscribeTemplate, } = require('../utils/email-templates');
const {
  validateUserRegisterData,
  // validateSendMailData,
   validateUserLoginData,
   validateUserUpdateData,
   validatePasswordUpdateData,
   validateUserRegisterDataFrontend,
   validateUserUpdateProfileData,
   validateSendMailData
} = require('./auth.validator');
const makeExpressCallback = require('../utils/express-callback');

const { BadRequestError } = require('../utils/api-errors');
// const { sendOtpTemplate, verifyOtpTemplate } = require('../utils/otp-template');
// const sendOTP = require('../utils/otp');
// controller
const controller = require('./auth.controller');
// const { validateUserPhoneData } = require("../user/user.validator");
// const { validateFileName } = require("../file-upload/file-upload.validator");


const register = controller.register({
  BadRequestError,
  doCheckUserExist,
  doRegister,
  validateUserRegisterData,
  // subscribeTemplate,
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
  EMAIL,
  INVITATION_TOKEN_EXPIRES_IN,
 // emailTransporter,
});

const updateUser = controller.updateUser({
  doUpdateUser,
  User,
    BadRequestError,
    // validateUserUpdateData
  });
  const updatePasssword = controller.updatePasssword({
    doupdatepassword,
    User,
      BadRequestError,
      validatePasswordUpdateData
      
    });
    const EditUserProfile = controller.EditUserProfile({
    doEditUserProfile,
      User,
      validateUserUpdateProfileData,
  BadRequestError,
      });

const frontTologin = controller.frontTologin({
  doCheckUserExist,
  dofrontLogin,
  validateUserLoginData,
  BadRequestError,
});

const forgetPassword = controller.forgetPassword({
  User,
  doForgetPassword,
  BadRequestError,
});
const login = controller.login({
  doCheckUserExist,
  doLogin,
  validateUserLoginData,
  BadRequestError,
});

const MobileToRegister = controller.MobileToRegister({
 doMobile,
 doCheckUserExistMobile,
  BadRequestError,
});


const loginToMobile = controller.loginToMobile({
  doMobileToLogin,
  doCheckUserExistOtp,
   BadRequestError,
 });
 

const Getbyid = controller.Getbyid({
  doGetbyid,
  User,
  Role,
    BadRequestError,
  });

  const remarkotp = controller.remarkotp({
    doremark,
      BadRequestError,
    });

  // const forgotPasssword = controller.forgotPasssword({
  //   dofrogetpassword,
  //     User,
  //       BadRequestError,
  //     });
  const frontregister = controller.frontregister({
    BadRequestError,
    doCheckUser,
    dofrontRegister,
    validateUserRegisterDataFrontend,
    JWT_ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    SIGN_OPTION,
    EMAIL,
    INVITATION_TOKEN_EXPIRES_IN,
   // emailTransporter,
  });
const AuthController = {
  register,
  login,
  Getbyid,
  updateUser,
  updatePasssword,
  frontregister,
  EditUserProfile,
  MobileToRegister,
  loginToMobile,
  remarkotp,
  // forgotPasssword,
  frontTologin,
  forgetPassword
};

// routes
const routes = require('./auth.routes')({
  AuthController,
  router,
  makeExpressCallback,
});

module.exports = {
  AuthController,
  AuthService: {
    doCheckUserExist,
    doLogin,
    doRegister,
    doGetbyid,
    dofrontRegister,
    doEditUserProfile,
    doMobile,
    doCheckUserExistOtp,
    doMobileToLogin,
    doremark,
    // dofrogetpassword,
    dofrontLogin,
    doForgetPassword
  },
  AuthRoutes: routes,
}; 
