const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validatePropertyTypeAdd = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data, options);
};

const validatePropertyTypeUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),

  });
  return schema.validate(data, options);
};

const validateTypeStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};


module.exports = {
  validatePropertyTypeAdd,
  validatePropertyTypeUpdate,
  validateTypeStatus
};
