
const { Projectenquiry, sequelize ,Email,propertyTypes,property,User,Location} = require("../../db");
const { propertyEnquiryTemplate,propertyEnquirytoadminTemplate,propertyEnquirytouserTemplate, } = require("../../utils/email-templates");
const emailTransporter = require('../../utils/email');

const { generateJWT, verifyJWT } = require("../../utils/jwt");

const { NotFoundError, BadRequestError } = require("../../utils/api-errors");
const doProjectenquiry = async ({ fname,
  email,
  phone,
  country_code,
  pro_id,
  message }) => {
  const projectenquiry = await Projectenquiry.create({
    fname,
    email,
    phone,
    country_code,
    pro_id,
    message
  });
  const PropertyName = await property.findOne({
    where: {
      id: pro_id
    },
  });
  const userName = await User.findOne({
    where: {
      id: PropertyName.dataValues.cus_id
    },
  });


  const PropertyType = await propertyTypes.findOne({
    where: {
      id: PropertyName.dataValues.p_typeid
    },
  });
  const locationName = await Location.findOne({
    where: {
      id: PropertyName.dataValues.location_id
    },
  });

  const emailtempleate = await Email.findOne({
    where: {
      id: 38
    },
  });
  let template;
  template = propertyEnquiryTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    // toEmail: email,
    toEmail: userName.dataValues.username,
    Propertyname: PropertyName.dataValues.name,
    PropertyId: PropertyName.dataValues.id,
    Propertytype: PropertyType.dataValues.name,
    Locationname: locationName.dataValues.name,
    TotalPrice: PropertyName.dataValues.tot_price,
    Name: userName.dataValues.name,
    UserName: fname,
    Mobile: phone,
    Email: email,
    Enquiry: message,
    html: emailtempleate.dataValues.description,
    subject: emailtempleate.dataValues.subject

  });
  const result = await emailTransporter.send(template);
  const emailtempleates = await Email.findOne({
    where: {
      id: 34
    },
  });
  const usernames = await User.findOne({
    where: {
      role_id:1
    },
  });
  let templates;
  templates = propertyEnquirytoadminTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: usernames.dataValues.username,
    Propertyname: PropertyName.dataValues.name,
    PropertyId: PropertyName.dataValues.id,
    Propertytype: PropertyType.dataValues.name,
    Locationname: locationName.dataValues.name,
    TotalPrice: PropertyName.dataValues.tot_price,
    Name: userName.dataValues.name,
    UserName: fname,
    Mobile: phone,
    Email: email,
    Enquiry: message,
    html: emailtempleates.dataValues.description,
    subject: emailtempleates.dataValues.subject
  });
  const results = await emailTransporter.send(templates);
  const emailtem = await Email.findOne({
    where: {
      id: 31
    },
  });
  let templetes;
  templetes = propertyEnquirytouserTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: email,
    email: userName.dataValues.username,
    name:fname,
    Ownername:userName.dataValues.name,
    mobile: userName.dataValues.featured_mobile==1?"**********":userName.dataValues.mobile,
    html: emailtem.dataValues.description,
    subject: emailtem.dataValues.subject,
    title: PropertyName.dataValues.name,
    p_typeid: PropertyType.dataValues.name,
    propertyurl: PropertyName.dataValues.url,
    tot_price: PropertyName.dataValues.tot_price,
  });
  const resultes = await emailTransporter.send(templetes);
  return { projectenquiryId: projectenquiry.id };
};
const doCreateSession = async ({phone,otp}) => {
  const apiUrls = 'https://whatappapi.in/api/send';
  const number = `91${phone}`;
  const type = 'text';
  const messagees = `Dear customer your OTP for Property Enquiry is ${otp}. Send this detail in Property Onwer.`;
  const instance_id = '64F7101C947FE';
  const access_token = '64b90ab2890d8';
  const params = {
    number: number,
    type: type,
    message: messagees,
    instance_id: instance_id,
    access_token: access_token,
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `${apiUrls}?${queryString}`;

  const res = await fetch(url, {
    method: 'GET',
  });

  if (res.status === 200) {
    try {
    } catch (error) {
      throw new BadRequestError('Invalid JSON response');
    }
  } else {
    console.error("Request failed with status:", res.status);
    throw new BadRequestError('Unable to fetch!');
  }
};
const doCheckUserExistOtp = async ({ phone, otp }) => {
  const user = await Projectenquiry.findOne({
    where: {
      phone,
      otp
    },
  });
  if (!user) throw new NotFoundError('User otp  not found!');
  if (user.otp === false) throw new NotFoundError('User otp  not found!');
  return user;
};
module.exports = {
  doProjectenquiry,
  doCreateSession,
  doCheckUserExistOtp
};
