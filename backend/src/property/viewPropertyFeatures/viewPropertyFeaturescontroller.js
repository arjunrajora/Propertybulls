//Add Propertyfeatures
const PropertyfeaturesAdd = ({
  BadRequestError,
  doPropertyFeatures,
  validatePropertyfeaturesAdd
}) => async (httpRequest) => {
  const {
    name,
  description,
  type,
  } = httpRequest.body;
  const {
    error,
  } = validatePropertyfeaturesAdd(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
    const featuresResult  = await doPropertyFeatures({
      name,
  description,
  type
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Property Features added successfully!',
        data: featuresResult,
      },
    };
};

//Get PropertyFeatures
const getFeatures = ({
  BadRequestError,
  doGetPropertyFeatures,
  Type,
  Features
  
}) => async (httpRequest) => {  
  const data = await doGetPropertyFeatures({
    BadRequestError,
    Type,
    Features
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

// Update Update Property Features
const updatePropertyFeatures = ({
  doUpdatePropertyFeatures,
  Features,
  BadRequestError,
  validatePropertyfeaturesUpdate 
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  Featuresdata  = httpRequest.body;
  const {
    error,
  } = validatePropertyfeaturesUpdate(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdatePropertyFeatures({
    id,
    Features,
    BadRequestError,
    Featuresdata
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Property Features updated successfully!',
      data,
    },
  };
};


//status data
const status = ({
  doStatus,
  Facing,
  BadRequestError,
  validateFeaturesStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = httpRequest.body;
  status=(status==="Y")?"N":"Y"
  const {
    error,
  } = validateFeaturesStatus(httpRequest.body);
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
      message: 'Status updated successfully!',
      data,
    },
  };
};

 //Edit Faq
  const EditFaq = ({
    doEditFaq,
    Faq
  }) => async (httpRequest) => {
    const { id } = httpRequest.params;
    const data = await doEditFaq({
      id,
      Faq
    });
    console.log("data==>>",data);
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'fetched Features successfully!',
        data,
      },
    };
  };

//Delete PropertyFeatures
const DeletePropertyFeatures = ({
  BadRequestError,
  doDeletePropertyFeatures  
}) => async (httpRequest) => {
  const {
    id,
  } = httpRequest.params;
 
  const data = await doDeletePropertyFeatures({
    id,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted Property Features successfully!',
      data,
    },
  };
};


module.exports = {
  PropertyfeaturesAdd,
  getFeatures,
  DeletePropertyFeatures,
  updatePropertyFeatures,
  EditFaq,
  status
};
