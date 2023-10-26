// Add Requirement
const addRequirement = ({
  BadRequestError,
  doRequirement,
  validateRequirementCreateData,
}) => async (httpRequest) => {
  console.log('@@@', httpRequest);
  const {
    category,
    p_typeid,
    state_id,
    city_id,
    location_id,
    cus_id,
    min_budget,
    max_budget,
    min_area,
    max_area,
    description,
    creater
  } = httpRequest.body;
  const { error } = validateRequirementCreateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doRequirement({
    category,
    p_typeid,
    state_id,
    city_id,
    location_id,
    cus_id,
    min_budget,
    max_budget,
    min_area,
    max_area,
    description,
    creater
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Requirement added successfully!',
      data,
    },
  };
};


// View Requirement
const getRequirement = ({
  BadRequestError,
  doGetRequirement,
  Requirement,
  Location,
  City,
  State,
  propertyTypes,
  User,
  Role
}) => async (httpRequest) => {
  const data = await doGetRequirement({
    Requirement,
    BadRequestError,
    Location,
    City,
    State,
    propertyTypes,
    User,
    Role
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Requirements details successfully!',
      data,
    },
  };
};






// Update Requirement
const updateRequirement = ({
  doUpdateRequirement,
  Requirement,
  BadRequestError,
  validateRequirementUpdateData
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const RequirementUpdateData = httpRequest.body;
  const { error } = validateRequirementUpdateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateRequirement({
    id,
    Requirement,
    BadRequestError,
    RequirementUpdateData
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Requirement updated successfully!',
      data,
    },
  };
};

// Delete Requirement
const deleteRequirement = ({ doDeleteRequirement, BadRequestError }) => async (
  httpRequest,
) => {
  const { id } = httpRequest.params;
  const data = await doDeleteRequirement({
    id,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Requirement deleted successfully!',
      data,
    },
  };
};

// View By Id
const getRequirementById = ({
  doGetRequirementById,
  Requirement
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetRequirementById({
    id,
    Requirement
  });
  console.log("data==>>", data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Requirement successfully!',
      data,
    },
  };
};

// Update Status


const updateRequirementStatus = ({ doUpdateRequirementStatus, Requirement, BadRequestError }) =>
  async (httpRequest) => {
    const { id } = httpRequest.params;
    let { status } = httpRequest.body;
    status = (status === "Y") ? "N" : "Y";



    // const {
    //   error,
    // } = validateCustomerStatus(httpRequest.body);
    // if (error) throw new BadRequestError(error.message);

    const data = await doUpdateRequirementStatus({
      id,
      Requirement,
      BadRequestError,
      status,
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: " Customer Status change  successfully!",
        data,
      },
    };
  };





//Search Requirement

const searchRequirement = ({
  doSearchRequirement,
  Requirement,
  BadRequestError,
  Location,
  City,
  State,
  propertyTypes,
  User,
  Role,
}) => async (httpRequest) => {
  const { state_id, city_id, location_id, cus_id, p_typeid, category } = httpRequest.body;
  console.log("BODY DATA=>>>", httpRequest.body);
  const data = await doSearchRequirement({
    state_id,
    city_id,
    location_id,
    cus_id,
    p_typeid,
    category,
    Requirement,
    BadRequestError,
    Location,
    City,
    State,
    propertyTypes,
    User,
    Role
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Requirement Search successfully!',
      data,
    },
  };
};













module.exports = {
  addRequirement,
  getRequirement,
  updateRequirement,
  deleteRequirement,
  getRequirementById,
  updateRequirementStatus,
  searchRequirement,
};
