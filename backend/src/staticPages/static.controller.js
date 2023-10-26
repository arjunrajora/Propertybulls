const { validateUpdateStaticStatus } = require("./static.validator");

const staticAdd = ({ BadRequestError, doStatic, validateAddStaticData }) => async (httpRequest) => {
  const { title, content } = httpRequest.body;
  const {
    filename
  } = httpRequest.file;
  // const { error } = validateAddStaticData(httpRequest.body);
  // if (error) throw new BadRequestError(error.message);
  const staticResult = await doStatic({
    title, filename, content
  })
  return {
    statusCode: 200,
    body: {
      success: true,
      message: "Static pages Added successfully!!",
      data: staticResult,
    }
  }
};

const getStatic = ({
  BadRequestError,
  doGetStatic,
  Static
}) => async (httpRequest) => {

  const data = await doGetStatic({
    BadRequestError,
    Static
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched static page successfully!',
      data,
    },
  };
};

const deleteStatic = ({ BadRequestError, Static, doDeleteStatic,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doDeleteStatic({
    id,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'StaticPage deleted successfully!',
      data,
    },
  };
};


const updateStatic = ({
  doUpdateStatic,
  Static,
  BadRequestError,

}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const StaticUpdateData = httpRequest.body;
  // const {filename} = httpRequest.file;
  var filename
  if (httpRequest.file) {
    var { filename } = httpRequest.file;
  }

  const data = await doUpdateStatic({
    id,
    Static,
    BadRequestError,
    StaticUpdateData,
    filename
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Static page,s updated successfully!',
      data,
    },
  };
};
// View By Id
const getStaticById = ({
  doGetStaticById,
  Static
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetStaticById({
    id,
    Static
  });
  console.log("data==>>", data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Static successfully!',
      data,
    },
  };
};

const updateStaticStatus = ({
  doUpdateStaticStatus,
  Static,
  BadRequestError,
  validateUpdateStaticStatus,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let { status } = httpRequest.body;
  status = (status === "Y") ? "N" : "Y"
  const { error } = validateUpdateStaticStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);



  const data = await doUpdateStaticStatus({
    id,
    Static,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Static status updated successfully!',
      data,
    },
  };
};


module.exports = {
  staticAdd,
  getStatic,
  deleteStatic,
  updateStatic,
  getStaticById,
  updateStaticStatus,

}