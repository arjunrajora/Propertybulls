
//Get Similarproject
const getSimilarproject = ({
  BadRequestError,
  doGetSimilarproject,
  Similarproject

}) => async (httpRequest) => {
  const data = await doGetSimilarproject({
    BadRequestError,
    Similarproject,
  });

  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Similarproject Fetch successfully!',
      data,
    },
  };
};

const Similarprojectbytype = ({
  BadRequestError,
  doGetSimilarprojectbytype,
  Similarproject,
}) => async (httpRequest) => {
  const { p_typeid } = httpRequest.params;
  const data = await doGetSimilarprojectbytype({
    BadRequestError,
    Similarproject,
    p_typeid
  });

  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Similarproject Fetch successfully!',
      data,
    },
  };
};



// similar projecta by id
const getSimilarprojectById = ({
  doGetSimilarprojectById,
  Similarproject,
  propertyTypes
}) => async (httpRequest) => {
  const { p_typeid } = httpRequest.body;
  const data = await doGetSimilarprojectById({
    p_typeid,
    Similarproject,
    propertyTypes
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched similarprojects successfully!',
      data
    },
  };
};


module.exports = {

  getSimilarproject,
  Similarprojectbytype,
  getSimilarprojectById,

};
