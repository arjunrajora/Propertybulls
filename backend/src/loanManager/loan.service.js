const { } = require('config');

const { Loan, sequelize, } = require('../db');

const { generateJWT, verifyJWT } = require('../utils/jwt');

const { NotFoundError, BadRequestError } = require('../utils/api-errors');

const loan = require('.');



//get data Loan
const doGetLoan = async ({
  loantype
}) => {
  const loan = await Loan.findAll({
    include:  { model: loantype},
    order: [["createdAt", "DESC"]],

  }
  );
  return loan
};




const doDeleteLoan = async ({
  id
}) => {
  const loan = await Loan.destroy({
    where: {
      id: id,
    },
  })
  if (loan == 0) throw new BadRequestError('id not match ');
  return loan[0];
};


// Update Loan Status
const doUpdateLoanStatus = async ({
  id,
  Loan,
  BadRequestError,
  status
}) => {
  const data = await Loan.update({ status },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Please try again later');
  return data[0];
};

// Search Loan
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchLoan = async ({
  name,
  email,
  mobile,
  dob,
  Loan,
  loantype,
  BadRequestError,
}) => {
  let newobject = {};
  if (name) {
    newobject.name = { [Op.like]: `%${name}%` }
  }
  if (email) {
    newobject.email = { [Op.like]: `%${email}%` }

  } if (mobile) {
    newobject.mobile = { [Op.like]: `%${mobile}%` }

  }
  if (dob) {
    newobject.dob = dob
  }

  console.log("newobject", newobject);
  const data = await Loan.findAll({
    where: newobject,
    include:  { model: loantype},

    order: [['name', 'ASC']],
  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};








module.exports = {

  doDeleteLoan,
  doUpdateLoanStatus,
  doGetLoan,
  doSearchLoan,

}