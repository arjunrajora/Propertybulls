const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddType = (data) => {
  const schema = Joi.object({
    type: Joi.number().required(),
  });
  return schema.validate(data, options);
};
const validateUpdateType = (data) => {
  const schema = Joi.object({
    type: Joi.string().required(),
    
  });
  return schema.validate(data, options);
};
module.exports = {
  validateUpdateType,
  validateAddType
};
