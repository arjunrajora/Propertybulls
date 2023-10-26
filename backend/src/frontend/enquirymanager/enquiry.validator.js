const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddEnquiryData = (data) => {
  const schema = Joi.object({
    f_name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    message: Joi.string().required(),

    
  });
  return schema.validate(data, options);
};








module.exports ={
  validateAddEnquiryData,

}
