//Add PropertyFacing
const PropertyFacingAdd = ({
  BadRequestError,
  doPropertyFacing,
  validatePropertyFacing
}) => async (httpRequest) => {
  const {
    name,
    description
  } = httpRequest.body;
  const {
    error,
  } = validatePropertyFacing(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
    const facingResult = await doPropertyFacing({
      name,
      description
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Property Facing Added successfully!',
        data: facingResult,
      },
    };
};

//Get Facing
const getFacing = ({
  BadRequestError,
  doGetPropertyFacing,
  Facing
}) => async (httpRequest) => {  
  const data = await doGetPropertyFacing({
    BadRequestError,
    // Facing
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Property Facing successfully!',
      data,
    },
  };
}; 

// Update Update Property Facing
const updatePropertyFacing = ({
  doUpdatePropertyFacing,
  Facing,
  BadRequestError,
  validateUPdatePropertyFacing 
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  facingdata  = httpRequest.body;
  const {
    error,
  } = validateUPdatePropertyFacing(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdatePropertyFacing({
    id,
    Facing,
    BadRequestError,
    facingdata
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Property Facing Updated successfully!',
      data,
    },
  };
};


//status data
const status = ({
  doStatus,
  Facing,
  BadRequestError,
  validateFacingStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = httpRequest.body;
  status=(status==="Y")?"N":"Y"
  const {
    error,
  } = validateFacingStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doStatus({
    id,
    Facing,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Status Updated successfully!',
      data,
    },
  };
};

//Delete PropertyFacing 
const DeletePropertyFacing = ({
  BadRequestError,
  doDeletePropertyFacing  
}) => async (httpRequest) => {
  const {
    id,
  } = httpRequest.params;
 
  const data = await doDeletePropertyFacing({
    id,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted Property Facing successfully!',
      data,
    },
  };
};


module.exports = {
  PropertyFacingAdd,
  getFacing,
  DeletePropertyFacing,
  updatePropertyFacing,
  status
};
