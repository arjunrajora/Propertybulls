
const { contactnow, Contactdetail, Alert, Email, User, property,Location,propertyTypes  } = require("../../db");

const { generateJWT, verifyJWT } = require("../../utils/jwt");
const { propertyInquiryTemplate ,propertyInquiryToOwnerTemplate,propertyInquiryAdminTemplate } = require("../../utils/email-templates");
const emailTransporter = require('../../utils/email');

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
  const faq = await contactnow.create({
    cus_id,
    message,
    fname,
    phone,
    email,
    pro_id
  });
  const propertyName = await property.findOne({
    where: {
      id: pro_id
    },
  });
  console.log("propertyName", propertyName)
  const Users = await User.findOne({
    where: {
      id: cus_id
    },
  });
  const emailtempleate = await Email.findOne({
    where: {
      id: 15
    },
  });
  const projecttype = await propertyTypes.findOne({
    where: {
      id:propertyName.dataValues.p_typeid
    },
  });
  let username;
  let template;
  template = propertyInquiryTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: email,
    Name: faq.fname,
    ownername: Users.dataValues.name,
    Mobile: Users.dataValues.mobile,
    Email: Users.dataValues.username,
    Price: propertyName.dataValues.tot_price == null ? "-" : propertyName.dataValues.tot_price,
    Propertyname: projecttype.dataValues.name,
    PropertyId: pro_id,
    html: emailtempleate.dataValues.description,
    subject: emailtempleate.dataValues.subject
  });
  const result= await emailTransporter.send(template);
  const emailstempleate = await Email.findOne({
    where: {
      id: 38
    },
  });

  const locations = await Location.findOne({
    where: {
      id:propertyName.dataValues.location_id
    },
  });
 let  templates = propertyInquiryToOwnerTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: Users.dataValues.username,
    ownername:Users.dataValues.name,
    username: fname,
    usermobile:phone ,
    useremail:email,
    pid:propertyName.dataValues.id,
    Price: propertyName.dataValues.tot_price == null ? "-" : propertyName.dataValues.tot_price,
    Propertyname: propertyName.dataValues.name,
    loc: locations.dataValues.name,
    ptype:projecttype.dataValues.name,
    PropertyId: faq.pro_id,
    enquiry:message,
    html: emailstempleate.dataValues.description,
    subject: emailstempleate.dataValues.subject
  });
  const results = await emailTransporter.send(templates);
  const emailstemp = await Email.findOne({
    where: {
      id: 16
    },
  });
  const Userers = await User.findOne({
    where: {
      role_id: 1
    },
  });
  let  admintemplate = propertyInquiryAdminTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: Userers.dataValues.username,
    ownername:Users.dataValues.name,
    username: fname,
    usermobile:phone ,
    useremail:email,
    pid:propertyName.dataValues.id,
    Price: propertyName.dataValues.tot_price == null ? "-" : propertyName.dataValues.tot_price,
    Propertyname: propertyName.dataValues.name,
    loc: locations.dataValues.name,
    ptype:projecttype.dataValues.name,
    PropertyId: faq.pro_id,
    enquiry:message,
    html: emailstemp.dataValues.description,
    subject: emailstemp.dataValues.subject
  });
  const resultes = await emailTransporter.send(admintemplate);

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
