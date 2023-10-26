
//Get Faq
const getFaq = ({
  BadRequestError,
  doGetFaq,
  Faq,
  FaqCatgory

}) => async (httpRequest) => {  
  const data = await doGetFaq({
    BadRequestError,
    Faq,
    FaqCatgory

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
const getFaqCatgorybyid= ({
  BadRequestError,
  doGetFaqCatgorybyid,
  FaqCatgory,
  Faq,
}) => async (httpRequest) => {  
  const {
    name
  } = httpRequest.body;
  const data = await doGetFaqCatgorybyid({
    BadRequestError,
    name,
    FaqCatgory,
    Faq,
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





 //Edit Faq
  const getFaqbyurl = ({
    dogetFaq,
    Faq,
    FaqCatgory
  }) => async (httpRequest) => {
    const { page_saluge } = httpRequest.body;
    const data = await dogetFaq({
      page_saluge,
      Faq,
      FaqCatgory
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



module.exports = {
  getFaq,
  getFaqbyurl,
  getFaqCatgorybyid,
};
