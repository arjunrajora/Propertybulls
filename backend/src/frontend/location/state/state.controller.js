
//Get Data in State
const getState = ({
  BadRequestError,
  doGetState,
  State
}) => async (httpRequest) => {
  
  const data = await doGetState({
    BadRequestError,
    State
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched State successfully!',
      data,
    },
  };
};




module.exports = {
  getState,

};
