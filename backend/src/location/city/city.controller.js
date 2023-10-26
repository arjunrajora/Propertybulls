const { validateUpdateStatus } = require("./city.validator");

const cityAdd =
  ({ BadRequestError, doCity, validateAddCityData }) =>
    async (httpRequest) => {
      const { state_id, name } = httpRequest.body;

      const { error } = validateAddCityData(httpRequest.body);
      if (error) throw new BadRequestError(error.message);

      const cityResult = await doCity({
        state_id,
        name,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "City added successfully!",
          data: cityResult,
        },
      };
    };

// View City
const getCity =
  ({ BadRequestError, doGetCity, City, State }) =>
    async (httpRequest) => {
      const data = await doGetCity({
        City,
        State,
        BadRequestError,


      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Fetched City  successfully!",
          data,
        },
      };
    };

const deleteCity = ({ BadRequestError, City, doDeleteCity,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doDeleteCity({
    id,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'City deleted successfully!',
      data,
    },
  };
};

const updateCity =
  ({ doUpdateCity, City, BadRequestError, validateUpdateCityData }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      const CityUpdateData = httpRequest.body;

      const {
        error,
      } = validateUpdateCityData(httpRequest.body);
      if (error) throw new BadRequestError(error.message);

      const data = await doUpdateCity({
        id,
        City,
        BadRequestError,
        CityUpdateData,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "City updated successfully!",
          data,
        },
      };
    };

// View By Id
// const getCityById =
//   ({ doGetCityById, City }) =>
//     async (httpRequest) => {
//       const { id } = httpRequest.params;
//       const data = await doGetCityById({
//         id,
//         City,
//       });
//       console.log("data==>>", data);
//       return {
//         statusCode: 200,
//         body: {
//           success: true,
//           message: "fetched City successfully!",
//           data,
//         },
//       };
//     };


const updateCityStatus = ({
  doUpdateCityStatus,
  City,
  BadRequestError,
  validateUpdateStatus,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let { status } = httpRequest.body;
  status = (status === "Y") ? "N" : "Y";


  const {
    error,
  } = validateUpdateStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);



  const data = await doUpdateCityStatus({
    id,
    City,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'City status updated successfully!',
      data,
    },
  };
};


// Search City
const searchCity = ({
  doSearchCity,
  City,
  BadRequestError,
  State
}) => async (httpRequest) => {
  const { name, status } = httpRequest.body;
  console.log("BODY DATA=>>>", httpRequest.body);
  const data = await doSearchCity({
    name,
    status,
    City,
    BadRequestError,
    State
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'City Search successfully!',
      data,
    },
  };
};

// View State City Manager
const getState =
  ({ BadRequestError, doGetState, State }) =>
    async (httpRequest) => {
      const data = await doGetState({
        State,
        BadRequestError,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "View State successfully!",
          data,
        },
      };
    };





module.exports = {
  cityAdd,
  getCity,
  deleteCity,
  updateCity,
  // getCityById,
  updateCityStatus,
  searchCity,
  getState
};
