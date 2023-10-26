// Add Email
const addEmail = ({
  BadRequestError,
  doEmail,
  validateEmailCreateData,
}) => async (httpRequest) => {
  console.log('@@@',httpRequest);
  const {
    title,
    subject,
    description
  } = httpRequest.body;
  const { error } = validateEmailCreateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
    const data = await doEmail({
    title,
    subject,
    description
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Email added successfully!',
        data,
      },
    };
};


// View Email
const getEmail = ({
  BadRequestError,
  doGetEmail,
  Email
}) => async (httpRequest) => {
  
    const data = await doGetEmail({
      Email,
      BadRequestError
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Emails details successfully!',
      data,
    },
  };
};
const getEmaildescription = ({
  BadRequestError,
  doGetEmaildescription,
  Email,
  id
}) => async (httpRequest) => {
  const {
 id
  } = httpRequest.params;
    const data = await doGetEmaildescription({
      Email,
      BadRequestError,
      id
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Emails details successfully!',
      data,
    },
  };
};
// Update Email
const updateEmail = ({
  doUpdateEmail,
  Email,
  BadRequestError,
  validateEmailUpdateData
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  EmailUpdateData  = httpRequest.body;
  const { error } = validateEmailUpdateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateEmail({
    id,
    Email,
    BadRequestError,
    EmailUpdateData
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Email updated successfully!',
      data,
    },
  };
};

// Delete Email
const deleteEmail = ({ doDeleteEmail,BadRequestError }) => async (
  httpRequest,
) => {
  const { id } = httpRequest.params;
  const data = await doDeleteEmail({
    id,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Email deleted successfully!',
      data,
    },
  };
};

// View By Id
const getEmailById = ({
  doGetEmailById,
  Email
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetEmailById({
    id,
    Email
  });
  console.log("data==>>",data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Email successfully!',
      data,
    },
  };
};

// Update Status
const updateEmailStatus = ({
  doUpdateEmailStatus,
  Email,
  BadRequestError,
  validateUpdateEmailStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = (httpRequest.body);
  status = (status==='Y')?'N':'Y';
  const {
    error,
  } = validateUpdateEmailStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateEmailStatus({
    id,
    Email,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Status updated successfully!',
      data,
    },
  };
};

module.exports = {
  addEmail,
  getEmail,
  updateEmail,
  deleteEmail,
  getEmailById,
  updateEmailStatus,
  getEmaildescription
};
