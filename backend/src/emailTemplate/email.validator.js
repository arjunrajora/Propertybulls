const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateEmailCreateData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    subject: Joi.string().required(),
    description: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateEmailUpdateData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    subject: Joi.string().required(),
    description: Joi.string().required(),   
  });
  return schema.validate(data, options);
};

const validateUpdateEmailStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};

module.exports = { validateEmailCreateData, validateEmailUpdateData, validateUpdateEmailStatus };
