const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};



const validateUpadateCustomerData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lname: Joi.string().required(),
    username: Joi.string().required(),
    mobile: Joi.string().required(),
    description: Joi.string().required(),




  });
  return schema.validate(data, options);
};



const validateCustomerStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),

  });
  return schema.validate(data, options);
};


module.exports = {
  validateCustomerStatus,
  validateUpadateCustomerData,
}
