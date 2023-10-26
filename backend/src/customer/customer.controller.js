const { doGetCustomer } = require("./customer.service");

const customerAdd =
  ({ BadRequestError, doCustomer }) =>
    async (httpRequest) => {
      const { name, role_id, mobile, created } =
        httpRequest.body;

      const customerResult = await doCustomer({
        name,
        role_id,
        mobile,
        created,

      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Customer added successfully!",
          data: customerResult,
        },
      };
    };

//Get Customer
const getCustomer = ({
  BadRequestError,
  doGetCustomer,
  Customer,
  Role,
  Property,
  Requirement,
}) => async (httpRequest) => {
  const data = await doGetCustomer({
    BadRequestError,
    Customer,
    Role,
    Property,
    Requirement,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Customer data successfully!',
      data,
    },
  };
};



// Delete Customer
const deleteCustomer = ({
  doDeleteCustomer,
  BadRequestError
  , doCheckPropertyByagent }) => async (
    httpRequest,
  ) => {
    const { id } = httpRequest.params;
    try {
      await doCheckPropertyByagent({
        cus_id: id,
        BadRequestError,
      });

    } catch (err) {
      const data = await doDeleteCustomer({
        id,
        BadRequestError,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: 'Customer  deleted successfully!',
          data,
        },
      };
    };
    throw new BadRequestError('Customer not deleted !');
  }







// update customer

const updateCustomer = ({
  doUpdateCustomer,
  Customer,
  BadRequestError,
  // validateBuilderUpdateData
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const CustomerUpdateData = httpRequest.body;

  var filename
  if (httpRequest.file) {
    var { filename } = httpRequest.file;
  }
  const data = await doUpdateCustomer({
    id,
    Customer,
    BadRequestError,
    CustomerUpdateData,
    filename
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Customer updated successfully!',
      data,
    },
  };
};




// Update Status
const StatusCustomer = ({ doStatusCustomer, Customer, BadRequestError, validateCustomerStatus }) =>
  async (httpRequest) => {
    const { id } = httpRequest.params;
    let { status } = httpRequest.body;
    status = (status === "Y") ? "N" : "Y";
    const {
      error,
    } = validateCustomerStatus(httpRequest.body);
    if (error) throw new BadRequestError(error.message);

    const data = await doStatusCustomer({
      id,
      Customer,
      BadRequestError,
      status,
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: " Customer Status change  successfully!",
        data,
      },
    };
  };


// Search Customer
const searchCustomer = ({
  doSearchCustomer,
  Customer,
  BadRequestError,
  Role,
  Property,
  Requirement
}) => async (httpRequest) => {
  const { name, username, mobile, status } = httpRequest.body;
  console.log("BODY DATA=>>>", httpRequest.body);
  const data = await doSearchCustomer({
    name,
    username,
    mobile,
    status,
    Customer,
    BadRequestError,
    Role,
    Property,
    Requirement
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Customer Search successfully!',
      data,
    },
  };
};


// customer detail by id 
const getCustomerdetailbyid = ({
  BadRequestError,
  doGetCustomerdetailbyid,
  Customer,

}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetCustomerdetailbyid({
    BadRequestError,
    Customer,

    id
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Customerdetailbyid data successfully!',
      data,
    },
  };
};


//customer get by id Added property view
const getCustomerbyid = ({
  BadRequestError,
  doGetCustomerbyid,
  Customer,
  Role,
  Property,
  propertyTypes,
  Responses,
  Facing
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetCustomerbyid({
    BadRequestError,
    Customer,
    Role,
    Property,
    Responses,
    propertyTypes,
    Facing,
    id
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Customer data successfully!',
      data,
    },
  };
};


//customerAdded requiremenet get by id 
const getCustomerRequirmentbyid = ({
  BadRequestError,
  doGetCustomerRequirmentbyid,
  Customer,
  // Role,
  Requirement,
  propertyTypes,
  Location,
  User
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetCustomerRequirmentbyid({
    BadRequestError,
    Customer,
    // Role,
    Requirement,
    propertyTypes,
    Location,
    id,
    User

  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched CustomerRequirement data successfully!',
      data,
    },
  };
};











module.exports = {
  customerAdd,
  getCustomer,
  deleteCustomer,
  updateCustomer,
  StatusCustomer,
  searchCustomer,
  getCustomerbyid,
  getCustomerRequirmentbyid,
  getCustomerdetailbyid,

};
