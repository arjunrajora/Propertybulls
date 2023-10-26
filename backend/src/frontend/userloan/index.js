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
} = require('../../db');

// const emailTransporter = require('../utils/email');

const {
 
  doDeleteLoan,
  doUpdateLoanStatus,
  doGetLoan,
  doSearchLoan,
  doLoan,
  doGetLoantype,
  doCheckUserExist
} = require('./loan.service');

const {
 
  validateUpdateStatus,
  validateloanrequrie
} = require('./loan.validator');

const makeExpressCallback = require('../../utils/express-callback');

const { BadRequestError } = require('../../utils/api-errors');
// controller
const controller = require('./loan.controller');

const getLoan = controller.getLoan({
  BadRequestError,
  doGetLoan,
  validateloanrequrie
})

const requrieLoan = controller.requrieLoan({
  BadRequestError,
  doLoan,
  doCheckUserExist,
  validateloanrequrie
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
  doSearchLoan,

});

const getloantype = controller.getloantype({
  doGetLoantype,
  loantype
})
const LoanController = {
  deleteLoan,
  updateLoanStatus,
  getLoan,
  searchLoan,
 requrieLoan,
 getloantype

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
    doLoan,
    doGetLoantype,
    doCheckUserExist
    
  },
  userloanRoutes: routes,
};