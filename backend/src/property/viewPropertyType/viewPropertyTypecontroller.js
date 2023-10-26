//Add PropertyType
const PropertyTypeAdd = ({
  BadRequestError,
  doPropertyType,
  validatePropertyTypeAdd
}) => async (httpRequest) => {
  const {
    name,
  description,
  
  } = httpRequest.body;
  const {
    error,
  } = validatePropertyTypeAdd(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
    const featuresResult  = await doPropertyType({
      name,
  description,
      });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Property Type Added Successfully!',
        data: featuresResult,
      },
    };
};

//Get PropertyType
const getType = ({
  BadRequestError,
  doGetPropertyType,
  
  
}) => async (httpRequest) => {  
  const data = await doGetPropertyType({
    BadRequestError,
  
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Property Type Successfully!',
      data,
    },
  };
}; 

//  Update Property Type
const updatePropertyType = ({
  doUpdatePropertyType,
  propertyTypes,
  BadRequestError,
  validatePropertyTypeUpdate 
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  typesdata  = httpRequest.body;
  const {
    error,
  } = validatePropertyTypeUpdate(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdatePropertyType({
    id,
    propertyTypes,
    BadRequestError,
    typesdata  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: ' View Property Type Updated Successfully!',
      data,
    },
  };
};


//status data
const status = ({
  doStatus,
  propertyTypes,
    BadRequestError,
  validateTypeStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = httpRequest.body;
  status=(status==="Y")?"N":"Y"
  const {
    error,
  } = validateTypeStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doStatus({
    id,
    propertyTypes,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Status updated successfully!',
      data,
    },
  };
};


//Delete Property Type
const DeletePropertyType = ({
  BadRequestError,
  doDeletePropertyType  
}) => async (httpRequest) => {
  const {
    id,
  } = httpRequest.params;
 
  const data = await doDeletePropertyType({
    id,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted Property Type successfully!',
      data,
    },
  };
};


module.exports = {
  PropertyTypeAdd,
  getType,
  DeletePropertyType,
  updatePropertyType,
  
  status
};
