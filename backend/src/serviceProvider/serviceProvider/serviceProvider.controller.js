// Add ServiceProvider
const addServiceProvider = ({
  BadRequestError,
  doServiceProvider,
  validateServiceProviderCreateData,
}) => async (httpRequest) => {
  console.log('@@@', httpRequest);
  const {
    category,
    email,
    name,
    company_name,
    company_url,
    start,
    per_name,
    // person_image,
    landline,
    mobile,
    address,
    state_id,
    city_id,
    location_id,
    description
  } = httpRequest.body;

  const {
    filename
  } = httpRequest.file;
  console.log(filename);
  const { error } = validateServiceProviderCreateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doServiceProvider({
    category,
    email,
    name,
    company_name,
    company_url,
    start,
    per_name,
    // person_image,
    landline,
    mobile,
    address,
    state_id,
    city_id,
    location_id,
    description,
    filename

  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'ServiceProvider added successfully!',
      data,
    },
  };
};

// View ServiceProvider
const getServiceProvider = ({
  BadRequestError,
  doGetServiceProvider,
  ServiceProvider
}) => async (httpRequest) => {
  const data = await doGetServiceProvider({
    ServiceProvider,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched ServiceProviders details successfully!',
      data,
    },
  };
};

// Update ServiceProvider

const updateServiceProvider = ({
  doUpdateServiceProvider,
  ServiceProvider,
  BadRequestError,
  validateServiceProviderUpdateData

}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const ServiceProviderUpdateData = httpRequest.body;
  var filename
  if (httpRequest.file) {
    var { filename } = httpRequest.file;
  }
  const data = await doUpdateServiceProvider({
    id,
    ServiceProvider,
    BadRequestError,
    ServiceProviderUpdateData,
    filename
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'ServiceProvider updated successfully!',
      data,
    },
  };
};


// Search ServiceProvider
const searchServiceProvider = ({
  doSearchServiceProvider,
  ServiceProvider,
  Location,
  BadRequestError,
}) => async (httpRequest) => {
  const { company_name, mobile, status, category } = httpRequest.body;
  console.log("BODY DATA=>>>", httpRequest.body);
  const data = await doSearchServiceProvider({
    company_name,
    mobile,
    status,
    category,
    ServiceProvider,
    Location,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'ServiceProvider Search successfully!',
      data,
    },
  };
};

// Delete ServiceProvider
const deleteServiceProvider = ({ doDeleteServiceProvider, BadRequestError }) => async (
  httpRequest,
) => {
  const { id } = httpRequest.params;
  const data = await doDeleteServiceProvider({
    id,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'ServiceProvider deleted successfully!',
      data,
    },
  };
};

// View By Id
const getServiceProviderById = ({
  doGetServiceProviderById,
  ServiceProvider
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetServiceProviderById({
    id,
    ServiceProvider
  });
  console.log("data==>>", data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched ServiceProvider successfully!',
      data,
    },
  };
};

// Update Status
const updateServiceProviderStatus = ({
  doUpdateServiceProviderStatus,
  ServiceProvider,
  BadRequestError,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let { status } = (httpRequest.body);
  status = (status === 'Y') ? 'N' : 'Y';
  const data = await doUpdateServiceProviderStatus({
    id,
    ServiceProvider,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'ServiceProvider updated successfully!',
      data,
    },
  };
};

module.exports = {
  addServiceProvider,
  getServiceProvider,
  updateServiceProvider,
  searchServiceProvider,
  deleteServiceProvider,
  getServiceProviderById,
  updateServiceProviderStatus
};
