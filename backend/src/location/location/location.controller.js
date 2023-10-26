// Add Location
const addLocation =
  ({ BadRequestError, doLocation, validateLocationCreateData }) =>
    async (httpRequest) => {
      console.log("@@@", httpRequest);
      const { state_id, city_id, name } = httpRequest.body;
      const { error } = validateLocationCreateData(httpRequest.body);
      if (error) throw new BadRequestError(error.message);
      const data = await doLocation({
        state_id,
        city_id,
        name,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Location added successfully!",
          data,
        },
      };
    };

// View Location
const getLocation =
  ({ BadRequestError, doGetLocation, Location, City }) =>
    async (httpRequest) => {
      const data = await doGetLocation({
        Location,
        City,
        BadRequestError,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Fetched Locations details successfully!",
          data,
        },
      };
    };

// Update Location
const updateLocation =
  ({
    doUpdateLocation,
    Location,
    BadRequestError,
    validateLocationUpdateData,
  }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      const LocationUpdateData = httpRequest.body;
      const { error } = validateLocationUpdateData(httpRequest.body);
      if (error) throw new BadRequestError(error.message);
      const data = await doUpdateLocation({
        id,
        Location,
        BadRequestError,
        LocationUpdateData,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Location updated successfully!",
          data,
        },
      };
    };

// Search Location
const searchLocation = ({
  doSearchLocation,
  Location,
  BadRequestError,
  City
}) => async (httpRequest) => {
  const { name, status } = httpRequest.body;
  console.log("BODY DATA=>>>", httpRequest.body);
  const data = await doSearchLocation({
    name,
    status,
    Location,
    BadRequestError,
    City
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Agent Search successfully!',
      data,
    },
  };
};


// Delete Location
const deleteLocation =
  ({ doDeleteLocation, BadRequestError }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      const data = await doDeleteLocation({
        id,
        BadRequestError,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Location deleted successfully!",
          data,
        },
      };
    };

// View By Id
const getLocationById =
  ({ doGetLocationById, Location }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      const data = await doGetLocationById({
        id,
        Location,
      });
      console.log("data==>>", data);
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "fetched Location successfully!",
          data,
        },
      };
    };

// Update Status
const updateLocationStatus =
  ({
    doUpdateLocationStatus,
    Location,
    BadRequestError,
    validateUpdateLocationStatus,
  }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      let { status } = (httpRequest.body);
      status = (status === 'Y') ? 'N' : 'Y';
      const { error } = validateUpdateLocationStatus(httpRequest.body);
      if (error) throw new BadRequestError(error.message);
      const data = await doUpdateLocationStatus({
        id,
        Location,
        BadRequestError,
        status,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Status updated successfully!",
          data,
        },
      };
    };



// View City 
const getCity =
  ({ BadRequestError, doGetCity, City }) =>
    async (httpRequest) => {
      const data = await doGetCity({
        City,
        BadRequestError,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "View City successfully!",
          data,
        },
      };
    };

module.exports = {
  addLocation,
  getLocation,
  updateLocation,
  searchLocation,
  deleteLocation,
  getLocationById,
  updateLocationStatus,
  getCity
};
