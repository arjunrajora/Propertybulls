// View Requirementalert
const getRequirementalert = ({
  BadRequestError,
  doGetRequirementalert,
  Requirementalert,
  propertyTypes,
  Location,
  City,
  State,

}) => async (httpRequest) => {
  const data = await doGetRequirementalert({
    Requirementalert,
    BadRequestError,
    propertyTypes,
    Location,
    City,
    State,

  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Requirementalerts details successfully!',
      data,
    },
  };
};


// Search Requirementalert

const searchRequirementalert = ({
  doSearchRequirementalert,
  Requirementalert,
  BadRequestError,
  propertyTypes, Location, City, State
}) => async (httpRequest) => {
  const { fname, phone, category, location_id, p_typeid, } = httpRequest.body;
  console.log("BODY DATA=>>>", httpRequest.body);
  const data = await doSearchRequirementalert({
    fname,
    phone,
    category,
    location_id,
    p_typeid,
    Requirementalert,
    BadRequestError,
    propertyTypes, Location, City, State
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Requirementalert Search successfully!',
      data,
    },
  };
};


//Requirementalert deleted

const deleteRequirement = ({ BadRequestError, Requirement, doDeleteRequirement,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doDeleteRequirement({
    id,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Requirementalert deleted successfully!',
      data,
    },
  };
};






module.exports = {
  getRequirementalert,
  searchRequirementalert,
  deleteRequirement
}