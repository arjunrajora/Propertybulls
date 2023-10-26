
// View Contactus
const getContactus = ({
    BadRequestError,
    doGetContactus,
    Staticpage
  }) => async (httpRequest) => {
      const data = await doGetContactus({
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

  module.exports = {
    getContactus,
  
  };
  