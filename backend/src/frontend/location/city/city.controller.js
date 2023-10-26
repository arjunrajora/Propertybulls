
  
  const getCity = ({
    BadRequestError,
    doGetCity,
    
    City
  }) => async (httpRequest) => {
      const data = await doGetCity({
        
        BadRequestError,
        City
      });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Fetched City details successfully!',
        data,
      },
    };
  };



  

module.exports = {

  getCity,

  
};
