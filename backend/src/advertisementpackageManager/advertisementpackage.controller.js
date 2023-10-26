// Add Builder
const addAdvertisementPackage = ({
  BadRequestError,
  Advertisement,
  doAdvertisementPackage,
  doCheckAdvertisementPackageLocation,
  validateAdvertisementPackageCreateData
}) => async (httpRequest) => {
  const {
    page,
    banner_position_id,
    duration,
    discount_price,
    amount,
    banner_size
  } = httpRequest.body;

  const {
    error,
  } = validateAdvertisementPackageCreateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  try {
    await doCheckAdvertisementPackageLocation({
      banner_position_id,
      page,
      duration,
      banner_size,
      Advertisement
    });
  } catch (err) {
      const data = await doAdvertisementPackage({
      page,
      banner_position_id,
      duration,
      discount_price,
      amount,
      banner_size
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Advertisement Package added successfully!',
        data,
      },
    };
  }
  throw new BadRequestError('Advertisement Package already exist!');
};

// View Banner Position
const getBannerPosition = ({
  BadRequestError,
  doGetBannerPosition,
  BannerPosition
}) => async (httpRequest) => {
    const data = await doGetBannerPosition({
      BadRequestError,
      BannerPosition
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Banner Position details successfully!',
      data,
    },
  };
};


const getAdvertisementPackage= ({
  BadRequestError,
  doGetAdvertisementPackage,
  Advertisement,
  BannerPosition
}) => async (httpRequest) => {
    const data = await doGetAdvertisementPackage({
      BadRequestError,
      Advertisement,
      BannerPosition
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Banner Position details successfully!',
      data,
    },
  };
};







const getBannerPageLocation = ({
  BadRequestError,
  doGetBannerPositionByPage,
  BannerPosition
}) => async (httpRequest) => {
const {page}=  httpRequest.params
    const data = await doGetBannerPositionByPage({
      BadRequestError,
      page,
      BannerPosition
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Banner Position details successfully!',
      data,
    },
  };
};



// Update Builder
const updateAdvertisementPackage = ({
  doUpdateAdvertisementPackage,
  Builder,
  BadRequestError,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  BuilderUpdateData  = httpRequest.body;
  const data = await doUpdateAdvertisementPackage({
    id,
    Builder,
    BadRequestError,
    BuilderUpdateData,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Builder updated successfully!',
      data,
    },
  };
};

// Search Builder
const searchBuilder = ({
  doSearchBuilder,
  Builder,
  Location,property,
  BadRequestError,
}) => async (httpRequest) => {
  const { name, mobile, startDate, endDate, loc_ids,status,featured } = httpRequest.body;
  console.log("BODY DATA=>>>",httpRequest.body); 
  const data = await doSearchBuilder({
    name,
    mobile,
    startDate,
    endDate,
    loc_ids,
    Builder,
    Location,
  property,
    status,
    featured,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Builder Search successfully!',
      data,
    },
  };
};

// Delete Builder
const deleteAdvertisementPackage= ({ doDeleteAdvertisementPackage,BadRequestError }) => async (
  httpRequest,
) => {
  const { id } = httpRequest.params;

    const data = await doDeleteAdvertisementPackage({
      id,
      BadRequestError,
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Advertisement Package deleted successfully!',
        data,
      },
    };
  };


// View By Id
const getBuilderById = ({
  doGetBuilderById,
  Builder
  
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetBuilderById({
    id,
    Builder
  });
  // console.log("data==>>",data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Builder successfully!',
      data,
    },
  };
};

// Update Status
const updateAdvertisementPackageStatus = ({
  doUpdateAdvertisementPackageStatus,
  Advertisement,
  BadRequestError,
  validateUpdateAdvertisementPackageStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = (httpRequest.body);
  status = (status==='Y')?'N':'Y';
  const {
    error,
  } = validateUpdateAdvertisementPackageStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateAdvertisementPackageStatus({
    id,
    Advertisement,
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

// Update Featured
const updateFeatured = ({
  doUpdateFeatured,
  Builder,
  BadRequestError,
  // validateAgentStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {featured}  = httpRequest.body;
  featured=(featured===1)?0:1
  // const {
  //   error,
  // } = validateAgentStatus(httpRequest.body);
  // if (error) throw new BadRequestError(error.message);
  const data = await doUpdateFeatured({
    id,
    Builder,
    BadRequestError,
    featured
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Featured updated successfully!',
      data,
    },
  };
};
// View By Id
const getProject = ({
  doGetProject,
  Builder,
  property,
  Location,
  propertyTypes,
  Facing,
  Responses
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetProject({
    id,
    Builder,
    property,
    Location,
    propertyTypes,
    Facing,
    Responses
  });
  console.log("data==>>",data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Property successfully!',
      data,
    },
  };
};


module.exports = {
  addAdvertisementPackage,
  getBannerPosition,
  getAdvertisementPackage,
  getBannerPageLocation,
  updateAdvertisementPackage,
  deleteAdvertisementPackage,
  searchBuilder,
  getBuilderById,
  updateAdvertisementPackageStatus,
  updateFeatured,
  getProject
};
