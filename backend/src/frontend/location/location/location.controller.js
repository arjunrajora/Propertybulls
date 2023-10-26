

// View Location
const getLocation = ({
  BadRequestError,
  doGetLocation,
  Location,
  City
}) => async (httpRequest) => {
    const data = await doGetLocation({
      Location,
      BadRequestError,
      City
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Locations details successfully!',
      data,
    },
  };
};



module.exports = {
  getLocation,
 
};
