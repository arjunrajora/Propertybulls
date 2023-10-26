// Add ServiceCategory
const addServiceCategory = ({
  BadRequestError,
  doServiceCategory,
  validateServiceCategoryCreateData,
}) => async (httpRequest) => {
  console.log('@@@', httpRequest);
  const {
    name,
    description
  } = httpRequest.body;
  const {
    filename
  } = httpRequest.file;


  const { error } = validateServiceCategoryCreateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doServiceCategory({
    name,
    description,
    filename
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'ServiceCategory added successfully!',
      data,
    },
  };
};


// View ServiceCategory
const getServiceCategory = ({
  BadRequestError,
  doGetServiceCategory,
  ServiceCategory
}) => async (httpRequest) => {
  const data = await doGetServiceCategory({
    ServiceCategory,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched ServiceCategorys details successfully!',
      data,
    },
  };
};

// Update ServiceCategory
const updateServiceCategory = ({
  doUpdateServiceCategory,
  ServiceCategory,
  BadRequestError,
  validateServiceCategoryUpdateData
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const ServiceCategoryUpdateData = httpRequest.body;
  // const { filename } = httpRequest.file;
  var filename
  if (httpRequest.file) {
    var { filename } = httpRequest.file;
  }


  // const { error } = validateServiceCategoryUpdateData(httpRequest.body);
  // if (error) throw new BadRequestError(error.message);

  const data = await doUpdateServiceCategory({
    id,
    ServiceCategory,
    BadRequestError,
    ServiceCategoryUpdateData,
    filename
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'ServiceCategory updated successfully!',
      data,
    },
  };
};

// Delete ServiceCategory
const deleteServiceCategory = ({ doDeleteServiceCategory, BadRequestError }) => async (
  httpRequest,
) => {
  const { id } = httpRequest.params;
  const data = await doDeleteServiceCategory({
    id,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'ServiceCategory deleted successfully!',
      data,
    },
  };
};

// View By Id
const getServiceCategoryById = ({
  doGetServiceCategoryById,
  ServiceCategory
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetServiceCategoryById({
    id,
    ServiceCategory
  });
  console.log("data==>>", data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched ServiceCategory successfully!',
      data,
    },
  };
};

// Update Status
const updateServiceCategoryStatus = ({
  doUpdateServiceCategoryStatus,
  ServiceCategory,
  BadRequestError,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let { status } = (httpRequest.body);
  status = (status === 'Y') ? 'N' : 'Y';
  const data = await doUpdateServiceCategoryStatus({
    id,
    ServiceCategory,
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

module.exports = {
  addServiceCategory,
  getServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  getServiceCategoryById,
  updateServiceCategoryStatus
};
