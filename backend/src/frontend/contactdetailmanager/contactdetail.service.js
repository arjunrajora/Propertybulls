
const { contactnow, Contactdetail, Alert, sequelize } = require("../../db");

const { generateJWT, verifyJWT } = require("../../utils/jwt");

const { NotFoundError, BadRequestError } = require("../../utils/api-errors");
const contactdetail = require(".");

// Contactdetail Add
const doContactdetail = async ({ fname, email, phone, category, p_typeid, min_budget, max_budget, location_id }) => {
  const contactdetail = await Contactdetail.create({ fname, email, phone, category, p_typeid, min_budget, max_budget, location_id });
  return { contactdetailId: contactdetail.id };
};


const doContactnow = async ({
  message,
  fname,
  phone,
  email,
  pro_id,
  cus_id
}) => {
  // const contactdetail = await contactnow.findOne({
  //   where: {
  //     pro_id: pro_id,
  //     email: email
  //   }
  // });

  // console.log(contactdetail, "user");

  // if (!contactdetail) {
  //   throw new NotFoundError('You have already shown interest in this property/project. Please check your email.');
  // }

  const faq = await contactnow.create({
    cus_id,
    message,
    fname,
    phone,
    email,
    pro_id
  });

  return {
    ContactId: faq.id
  };
};

// Requirement Alerts Manager
const doAlert = async ({
  fname,
  email,
  phone,
  category,
  p_typeid,
  max_budget,
  min_budget,
  country_code,
  // security_code,
  location_id
}) => {

  const existingCustomer = await Alert.findOne({
    where: {
      email: email,
      // id: { [Op.ne]: id } // exclude the current customer's id from the search
    }
  });

  if (existingCustomer) {
    throw new BadRequestError(" You have already shown intrested in this category");
  }


  const faq = await Alert.create(
    {
      fname,
      email,
      phone,
      category,
      p_typeid,
      max_budget,
      min_budget,
      country_code,
      // security_code,
      location_id
    },

  );

  return {
    AlertId: faq.id
  };
};




const doGetcontactDetailbycus_id = async ({
  cus_id,
  Property
}) => {

  const data = await contactnow.findAll({
    where: { cus_id: cus_id },
    include: [{ model: Property }]
  });

  return data;
};






const doDeleteContactnow = async ({
  id,

}) => {

  const data = await contactnow.destroy({
    where: { id: id },
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};









module.exports = {
  doContactdetail,
  doContactnow,
  doAlert,
  doGetcontactDetailbycus_id,
  doDeleteContactnow
};
