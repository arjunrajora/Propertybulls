//Add Faq
const typeAdd = ({
  BadRequestError,
  doType,
  validateAddType
}) => async (httpRequest) => {
  const {
type
  } = httpRequest.body;
  const {
    error,
  } =   validateAddType(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
    const faqResult = await doType({
      type
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'type added successfully!',
        data: faqResult,
      },
    };
};

//Get Faq
const getType= ({
  BadRequestError,
  doGetType,
  Type
}) => async (httpRequest) => {  
  const data = await doGetType({
    BadRequestError,
    Type
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched faq successfully!',
      data,
    },
  };
}; 

// Update Faq
const updateFaq = ({
  doUpdateFaq,
  Faq,
  BadRequestError,
  validateUpdateFaq
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  faqdata  = httpRequest.body;
  const {
    error,
  } = validateUpdateFaq(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateFaq({
    id,
    Faq,
    BadRequestError,
    faqdata
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Faq updated successfully!',
      data,
    },
  };
};
   
//status data
const status = ({
  doStatus,
  Faq,
  BadRequestError,
  validateFaqStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = httpRequest.body;
  status=(status==="Y")?"N":"Y"
  const {
    error,
  } = validateFaqStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doStatus({
    id,
    Faq,
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

 //Edit Faq
  const EditFaq = ({
    doEditFaq,
    Faq
  }) => async (httpRequest) => {
    const { id } = httpRequest.params;
    const data = await doEditFaq({
      id,
      Faq
    });
    console.log("data==>>",data);
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'fetched Faq successfully!',
        data,
      },
    };
  };

//Delete Faq 
const Faqdelete = ({
  BadRequestError,
  doDeleteFaq  
}) => async (httpRequest) => {
  const {
    id,
  } = httpRequest.params;
 
  const data = await doDeleteFaq({
    id,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted Faq successfully!',
      data,
    },
  };
};


module.exports = {
  typeAdd,
  getType,
  Faqdelete,
  updateFaq,
  EditFaq,
  status
};
