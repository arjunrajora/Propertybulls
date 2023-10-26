const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateContactnow = (data) => {
  const schema = Joi.object({
    phone: Joi.string().required(),
    email: Joi.string().required(),
    fname: Joi.string().required(),
    message: Joi.string().required(),
    pro_id: Joi.number().required(),
    cus_id: Joi.number().required(),
  });
  return schema.validate(data, options);
};


module.exports = {
  validateContactnow,

};
