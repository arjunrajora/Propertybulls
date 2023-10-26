//Add Faq
const faqAdd = ({
  BadRequestError,
  doFaq,
  validateAddFaq
}) => async (httpRequest) => {

  const {
    error,
  } = validateAddFaq(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const {   question,
    description,
    faq_category,
    page_saluge,answer}=httpRequest.body
    const faqResult = await doFaq({ 
      question,
description,
faq_category,
page_saluge,
answer
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'FAQ added successfully!',
        data: faqResult,
      },
    };
};

//Get Faq
const getFaq = ({
  BadRequestError,
  doGetFaq,
  Faq
}) => async (httpRequest) => {  
  const data = await doGetFaq({
    BadRequestError,
    Faq
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


//Get Faq
const getFaqCatgory = ({
  BadRequestError,
  doGetFaqCatgory,
  FaqCatgory
}) => async (httpRequest) => {  
  const data = await doGetFaqCatgory({
    BadRequestError,
    FaqCatgory  });
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

//Update Status
const updateFeatured = ({
  doUpdateFeatured,
  Faq,
  BadRequestError,
  // validateAgentStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {featured}  = httpRequest.body;
  featured=(featured===1)?0:1
  // const {
  //   error,
  // } = validateAgentStatus(httpRequest.body);
  // if (error) throw new BadRequestError(error.message);
  const data = await doUpdateFeatured({
    id,
    Faq,
    BadRequestError,
    featured
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Featured updated successfully!',
      data,
    },
  };
};

const getFaqbyid = ({
  dogetFaqbyid,
  Faq,
  FaqCatgory
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await dogetFaqbyid({
    id,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Faq successfully!',
      data,
    },
  };
};

module.exports = {
  faqAdd,
  getFaq,
  Faqdelete,
  updateFaq,
  EditFaq,
  status,
  getFaqCatgory,
  updateFeatured,
  getFaqbyid
};
