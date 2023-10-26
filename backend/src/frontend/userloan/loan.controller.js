
const requrieLoan = ({
  BadRequestError,
  doLoan,
  validateloanrequrie
}) => async (httpRequest) => {  
 const {  name,
    user_type,
        email,
       mobile,
     location,
          dob,
    loan_type,
  gross_salary,
  monthly_salary}=httpRequest.body
  console.log(user_type);
  const {
    error,
  } = validateloanrequrie(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doLoan({
    name,
    user_type,
        email,
       mobile,
     location,
          dob,
    loan_type,
  gross_salary,
  monthly_salary,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'I m interested loan  !',
      data,
    },
  };
}; 






const getLoan = ({
  BadRequestError,
  doGetLoan,
  Loan
}) => async (httpRequest) => {  
  const data = await doGetLoan({
    BadRequestError,
    Loan
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Loan successfully!',
      data,
    },
  };
}; 



const getloantype = ({
  BadRequestError,
  doGetLoantype,
  loantype
}) => async (httpRequest) => {  
  const data = await doGetLoantype({
    BadRequestError,
    loantype
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Loan_type successfully!',
      data,
    },
  };
}; 
















const deleteLoan = ({ BadRequestError, Loan, doDeleteLoan,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doDeleteLoan({
    id,});
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted Loan  successfully!',
      data,
    },
  };
};


const updateLoanStatus = ({
  doUpdateLoanStatus,
  Loan,
  BadRequestError,
  validateUpdateStatus,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = httpRequest.body;
  status =(status==="Y")?"N":"Y"
  const {
    error,
  } = validateUpdateStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);

  const data = await doUpdateLoanStatus({
    id,
    Loan,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Loan status updated successfully!',
      data,
    },
  };
};

// Search Loan
const searchLoan = ({
  doSearchLoan,
  Loan,
  BadRequestError,
}) => async (httpRequest) => {
  const { name,email,mobile,dob } = httpRequest.body;
  console.log("BODY DATA=>>>",httpRequest.body); 
  const data = await doSearchLoan({
    name,
    email,
    mobile, 
    dob,
    Loan,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Loan Search successfully!',
      data,
    },
  };
};




module.exports ={
      getLoan,
    deleteLoan,
    updateLoanStatus,
    searchLoan,
    requrieLoan,
    getloantype
}