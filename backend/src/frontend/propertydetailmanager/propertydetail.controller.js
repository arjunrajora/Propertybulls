// View Propertydetail
const getPropertydetail = ({
  BadRequestError,
  doGetPropertydetail,
  Property,
  propertyTypes
}) => async (httpRequest) => {
  const {
    url,
    p_typeid,
    type,
  } = httpRequest.body;
  const data = await doGetPropertydetail({
    Property,
    BadRequestError,
    url,
    p_typeid,
    type,
    propertyTypes
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Propertydetails  successfully!',
      data,
    },
  };
};

const getview = ({
  BadRequestError,
  doview,
  Property,
  Location,
  User
}) => async (httpRequest) => {

  const data = await doview({
    Property,
    BadRequestError,
    Location,
    User

  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Propertydetails  successfully!',
      data,
    },
  };
};


// get propertyType
const getPropertyType = ({
  BadRequestError,
  dogetPropertyType,


}) => async (httpRequest) => {
  const data = await dogetPropertyType({
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


// view by id 

const getPropertydetailById = ({
  doGetPropertydetailById,
  Property,
  propertyTypes,
  propertyImage,
  propertydetails,
  Propertyfeature,
  User,
  Role,
  Features
}) => async (httpRequest) => {
  const { url } = httpRequest.params;
  const data = await doGetPropertydetailById({
    url,
    Property,
    propertyTypes,
    propertyImage,
    propertydetails,
    Propertyfeature,
    User,
    Role,
    Features

  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Propertydetail successfully!',
      data
    },
  };
};

const getPropertydetailurlby = ({
  dogetPropertydetail,
  docheckpro_id,
  Property,
}) => async (httpRequest) => {
  const { url } = httpRequest.params;
  const data = await dogetPropertydetail({
    url,
    Property,
  });

  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Propertydetail successfully!',
      alll,
    },
  };
};

const chackpro_id = ({
  docheckpro_id,
  Propertyfeature
}) => async (httpRequest) => {
  const { pro_id } = httpRequest.params;
  const data = await docheckpro_id({
    pro_id,
    Propertyfeature
  });
  console.log("data==>>", data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched feature successfully!',
      data,
    },
  };
};




module.exports = {
  getPropertydetail,
  getview,
  getPropertydetailById,
  getPropertydetailurlby,
  chackpro_id,
  getPropertyType
};
