// View Contactinquiry
const getContactinquiry = ({
  BadRequestError,
  doGetContactinquiry,
  Contactinquiry,
  Property,
  Customer,
  Location,
  User,
  City

}) => async (httpRequest) => {
  const data = await doGetContactinquiry({
    Contactinquiry,
    BadRequestError,
    Property,
    Customer,
    Location,
    User,
    City
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Contactinquirys details successfully!',
      data,
    },
  };
};


// Search Contactinquiry

const searchContactinquiry = ({
  doSearchContactinquiry,
  Contactinquiry,
  BadRequestError,
  Property, Customer,
  Location,
  User,
  City
}) => async (httpRequest) => {
  const { fname, phone, pro_id } = httpRequest.body;
  console.log("BODY DATA=>>>", httpRequest.body);
  const data = await doSearchContactinquiry({
    fname,
    phone,
    pro_id,
    Contactinquiry,
    BadRequestError,
    Property, Customer,
    Location, User, City
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Contactinquiry Search successfully!',
      data,
    },
  };
};



//Delete Contact Inquiry
const Contactinquirydelete = ({
  BadRequestError,
  doDeleteContactinquiry
}) => async (httpRequest) => {
  const {
    id,
  } = httpRequest.params;

  const data = await doDeleteContactinquiry({
    id,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted Contact Inquiry successfully!',
      data,
    },
  };
};





module.exports = {
  getContactinquiry,
  searchContactinquiry,
  Contactinquirydelete
}