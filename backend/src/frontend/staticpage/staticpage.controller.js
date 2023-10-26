
// View AboutUspage
const getAboutus = ({
    BadRequestError,
    doGetAboutus,
    Staticpage
  }) => async (httpRequest) => {
      const data = await doGetAboutus({
        Staticpage,
        BadRequestError
      });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Fetched Staticpages details successfully!',
        data,
      },
    };
  };
  
// View Helpage
const getHelp = ({
  BadRequestError,
  doGetHelp,
  Staticpage
}) => async (httpRequest) => {
    const data = await doGetHelp({
      Staticpage,
      BadRequestError
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched help details successfully!',
      data,
    },
  };
};

// View Privacy&policy
const getPrivacy = ({
  BadRequestError,
  doGetPrivacy,
  Staticpage
}) => async (httpRequest) => {
    const data = await doGetPrivacy({
      Staticpage,
      BadRequestError
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched privacy&policy details successfully!',
      data,
    },
  };
};

// View Terms&Condition
const getTerms = ({
  BadRequestError,
  doGetTerms,
  Staticpage
}) => async (httpRequest) => {
    const data = await doGetTerms({
      Staticpage,
      BadRequestError
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Terms&Conditions details successfully!',
      data,
    },
  };
};


  module.exports = {
    getAboutus,
    getHelp,
    getPrivacy,
    getTerms,
  };
  