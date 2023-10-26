const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validatePropertyfeaturesAdd = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.number().required(),
    // type_id:Joi.INTEGER().required()

  });
  return schema.validate(data, options);
};

const validatePropertyfeaturesUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.number().required(),

  });
  return schema.validate(data, options);
};

const validateFeaturesStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};


module.exports = {
  validatePropertyfeaturesAdd,
  validatePropertyfeaturesUpdate,
  validateFeaturesStatus
};
