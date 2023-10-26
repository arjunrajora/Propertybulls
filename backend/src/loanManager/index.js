const router = require('express').Router();
const {
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
  EMAIL,
  INVITATION_TOKEN_EXPIRES_IN,
} = require('config');

const {
  Loan,
  loantype
} = require('../db');

// const emailTransporter = require('../utils/email');

const {
 
  doDeleteLoan,
  doUpdateLoanStatus,
  doGetLoan,
  doSearchLoan
  
} = require('./loan.service');

const {
 
  validateUpdateStatus
} = require('./loan.validator');
// const {
//   validateUserRegisterData,
//   // validateSendMailData,
//    validateUserLoginData,
// } 
const makeExpressCallback = require('../utils/express-callback');

const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./loan.controller');

const getLoan = controller.getLoan({
  BadRequestError,
  doGetLoan,
  loantype,
  Loan
})


const deleteLoan = controller.deleteLoan({
  BadRequestError,
  doDeleteLoan
})

const updateLoanStatus = controller.updateLoanStatus({
  BadRequestError,
  Loan,
  doUpdateLoanStatus,
  validateUpdateStatus,
});


const searchLoan = controller.searchLoan({
  BadRequestError,
  Loan,
  loantype,

  doSearchLoan,
});


const LoanController = {
  deleteLoan,
  updateLoanStatus,
  getLoan,
  searchLoan
 

};









// routes
const routes = require('./loan.routes')({
  LoanController,
  router,
  makeExpressCallback,
});

module.exports = {
  LoanController,
  LoanService: {
   
    doDeleteLoan,
    doUpdateLoanStatus,
    doSearchLoan,
    
  },
  LoanRoutes: routes,
};