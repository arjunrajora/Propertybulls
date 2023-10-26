const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddState = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data, options);
};
const validateUpdateState = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data, options);
};

const validateStatusState = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};

module.exports = {
  validateAddState,
  validateUpdateState,
  validateStatusState
};
