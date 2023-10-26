const{ } = require ('config');

const {Loan,loantype,Email,sequelize,} = require ('../../db');

const { generateJWT, verifyJWT } = require('../../utils/jwt');
const emailTransporter = require('../../utils/email');
const {
  SandLoaninquryTemplate,

} = require("../../utils/email-templates");
const { NotFoundError, BadRequestError } = require('../../utils/api-errors');
const doLoan = async ({
  name,
  user_type,
      email,
     mobile,
   location,
        dob,
  loan_type,
gross_salary,
monthly_salary
}) => {
  const existingUser = await Loan.findOne({
    where: { email },
  });
    if (existingUser) throw new NotFoundError("Builder not found!");

  const loan = await Loan.create({
    name,
    user_type,
        email,
       mobile,
     location,
          dob,
    loan_type,
  gross_salary,
  monthly_salary
  }
  );
  const emailtempleate = await Email.findOne({
    where: {
      id:36
    },
  });
  const typeess = await loantype.findOne({
    where: {
      id:loan_type
    },
  });
  function setuserId(id) {
    if (id == 0) {
      return "Salaried";
    } else if (id ==1) {
      return "Self Employed";
    } 
    else {
      return "Unknown";
    }
  }
  const expiryDate = new Date(dob);
  // const PkgExpire = expiryDate.toISOString().split('T')[0]
  const PkgExpire = expiryDate.toLocaleDateString('en-GB')
  console.log("🚀 ~ file: loan.service.js:63 ~ PkgExpire:", PkgExpire)
  const role = setuserId(user_type);
  let template;
  template = SandLoaninquryTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: email,
    Name:name,
    html:emailtempleate.dataValues.description,
    subject:emailtempleate.dataValues.subject,
    mobile:mobile,
    email:email,
    gross_salary:gross_salary,
    monthly_salary:monthly_salary,
    dob:PkgExpire,
    occup:role,
    location:location,
    loan_type:typeess.dataValues.name,
    site_url:'https://stage.propertybull.com'
  });
await emailTransporter.send(template)

  return loan.id
};
//get data Loan
const doGetLoan = async ({
}) => {
  const loan = await Loan.findAll(
  );
  return loan
};

// get loan_type
const doGetLoantype= async ({
}) => {
  const loans = await loantype.findAll(
  );
  return loans
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
  const data = await Loan.update(  {status},
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
  BadRequestError,
}) => {
let newobject = {};
if(name){
  newobject.name= { [Op.like]: `%${name}%` }
}
if(email){
  newobject.email=email
}if(mobile){
  newobject.mobile=mobile
}
if(dob){
  newobject.dob=dob
}

console.log("newobject",newobject);
  const data = await Loan.findAll({
    where:  newobject, 
  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};








module.exports={
  
    doDeleteLoan,
    doUpdateLoanStatus,
    doGetLoan,
    doSearchLoan,
    doLoan,
    doGetLoantype
    
}