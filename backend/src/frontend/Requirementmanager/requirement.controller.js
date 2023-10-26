// Add Requirement
const addRequirement = ({
  BadRequestError,
  doRequirement,
  validateRequirementCreateData,
}) => async (httpRequest) => {
  console.log('@@@', httpRequest);
  const {
    max_room,
    min_room,
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
    creater,
    unit
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
    creater,
    unit,
    max_room,
    min_room,
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


const getRequirementbyId = ({
  doGetRequirementbyId,
  Requirement,
  propertyTypes

}) => async (httpRequest) => {
  const {cus_id}= httpRequest.body
  const data = await doGetRequirementbyId({
    Requirement,
    propertyTypes,
    cus_id

  });
  console.log("data==>>", data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched requriement successfully!',
      data,
    },
  };
};

const getRequirements = ({
  BadRequestError,
  doGetRequirements,
  Requirement,
  propertyTypes
}) => async (httpRequest) => {  
  const data = await doGetRequirements({
    BadRequestError,
    Requirement,
    propertyTypes
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Property Features successfully!',
      data,
    },
  };
}; 



// Delete Requirement
const deleteRequirement = ({ doDeleteRequirement,BadRequestError }) => async (
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



const getRequirementsbycategory = ({
  doGetRequirementbuycategory,
  propertyTypes 
}) => async (httpRequest) => {
  const { cus_id,category} = httpRequest.body;
  const data = await doGetRequirementbuycategory ({
    cus_id,category,
    propertyTypes
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched property  successfully!',
      data,
    },
  };
};











module.exports = {
  addRequirement,
  getRequirementbyId,
  getRequirements,
  deleteRequirement,
  getRequirementsbycategory

};
