const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateUserRegisterData = (data) => {
  console.log(data);
  const schema = Joi.object({
    username: Joi.string().min(4).max(20),
    password: Joi.string()
      .required()
      .messages({
        'string.min': 'password should have a minimum length of 8',
        'string.pattern.base': 'Password is weak',
      }),
    // role: Joi.string()
    //   .valid('Student', 'Teacher', 'Guardian', 'School')
    //   .required(),
    // firebaseToken: Joi.string(),
    // gender: Joi.string().valid('male', 'female', 'other'),
    // email: Joi.string().email().required().messages({
    //   'any.required': 'Email is required!',
    //   'string.email': 'Please provide a valid email!',
    // }),
    name: Joi.string().required(),
    lname: Joi.string().required(),
    mobile: Joi.string().required(),
    role_id: Joi.string().required(),
    // termsCondition: Joi.boolean(),
    // sendPromotionalOffer: Joi.boolean(),
  });
  return schema.validate(data, options);
};
const validateUserLoginData = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required!',
      'string.email': 'Please provide a valid email!',
    }),
    password: Joi.string()
      .required()
      .messages({
        'string.min': 'password should have a minimum length of 8',
        'string.pattern.base': 'Password is weak',
      }),
    firebaseToken: Joi.string(),

  });
  return schema.validate(data, options);
};

const validateSendMailData = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required!',
      'string.email': 'Please provide a valid email!',
    }),
    name: Joi.string().required(),
  });
  return schema.validate(data, options);
};
const validateUserUpdateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lname: Joi.string().required(),
    mobile: Joi.number().required(),
    address: Joi.string().required(),
    Image: Joi.string().required(),
    fax: Joi.string().required(),
    username: Joi.string().required(),


  });
  return schema.validate(data, options);
};



const validatePasswordUpdateData = (data) => {
  const schema = Joi.object({
   
    password: Joi.string().required(),
    


  });
  return schema.validate(data, options);
};

const validateUserRegisterDataFrontend = (data) => {
  console.log(data);
  const schema = Joi.object({
    username: Joi.string(),
    password: Joi.string()
      .required()
      .messages({
        'string.min': 'password should have a minimum length of 8',
        'string.pattern.base': 'Password is weak',
      }),
    name: Joi.string().required(),
    role_id: Joi.number().required(),
    country_code: Joi.number().required(),
    mobile: Joi.number().required(),
    // termsCondition: Joi.boolean(),
    // sendPromotionalOffer: Joi.boolean(),
  });
  return schema.validate(data, options);
};
const validateUserUpdateProfileData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    mobile: Joi.number().required(),
    country_code: Joi.number().required(),
    loc_ids: Joi.string().required(),
    mobileno: Joi.number().required(),
    altemail: Joi.string().required(),
    address: Joi.string().required(),




  });
  return schema.validate(data, options);
};
module.exports = {
  validateUserRegisterData,
  validateSendMailData,
  validateUserLoginData,
  validateUserUpdateData,
  validatePasswordUpdateData,
  validateUserRegisterDataFrontend,
  validateUserUpdateProfileData
};
