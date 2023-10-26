//Get Loan
const getLoan = ({
  BadRequestError,
  doGetLoan,
  Loan,
  loantype
}) => async (httpRequest) => {  
  const data = await doGetLoan({
    BadRequestError,
    Loan,
    loantype
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
  loantype,
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
    loantype,
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
}