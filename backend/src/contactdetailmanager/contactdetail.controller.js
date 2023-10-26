const contactdetailAdd = ({ BadRequestError, doContactdetail, }) => async (httpRequest) => {
  const { fname, email, phone, category, p_typeid, min_budget, max_budget, location_id } = httpRequest.body;

  const { error } = (httpRequest.body);
  if (error) throw new BadRequestError(error.message);

  const contactdetailResult = await doContactdetail({
    fname, email, phone, category, p_typeid, min_budget, max_budget, location_id
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Thank you for Send Your Requirement!',
      data: contactdetailResult,
    },
  };
};



const Contactnow = ({
  BadRequestError,
  doContactnow, validateContactnow }) => async (httpRequest) => {
    const {
      fname, email, phone, message, pro_id, cus_id
    } = httpRequest.body;
    const {
      error,
    } = validateContactnow(httpRequest.body);
    if (error) throw new BadRequestError(error.message);
    const contactdetailResult = await doContactnow({
      fname, email, phone, message, pro_id, cus_id
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Thank you for Sand Your !',
        data: contactdetailResult,
      },
    };
  };

// Requirement Alerts
const Alertrequrie = ({
  BadRequestError,
  doAlert
}) => async (httpRequest) => {
  const {
    fname,
    email,
    phone,
    category,
    p_typeid,
    max_budget,
    min_budget,
    country_code,
    security_code,
    location_id
  } = httpRequest.body;

  const contactdetailResult = await doAlert({
    fname,
    email,
    phone,
    category,
    p_typeid,
    max_budget,
    min_budget,
    country_code,
    security_code,
    location_id
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Thank You for Contact With Us Your Requirement Information has been sent successfully to Owner!',
      data: contactdetailResult,
    },
  };
};

const GetcontactDetailbycus_id = ({
  doGetcontactDetailbycus_id,
  Property
}) => async (httpRequest) => {
  const { cus_id } = httpRequest.body;
  const data = await doGetcontactDetailbycus_id({
    cus_id,
    Property
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched ContactDetail successfully!',
      data,
    },
  };
};

const deletecontactnow = ({
  doDeleteContactnow,

}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doDeleteContactnow({
    id,

  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'delete Contact  successfully!',
      data,
    },
  };
};

module.exports = {
  contactdetailAdd,
  Contactnow,
  Alertrequrie,
  GetcontactDetailbycus_id,
  deletecontactnow
}