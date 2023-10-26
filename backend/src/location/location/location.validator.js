const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateLocationCreateData = (data) => {
  const schema = Joi.object({
    state_id: Joi.number().required(),
    city_id: Joi.number().required(),
    name: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateLocationUpdateData = (data) => {
  const schema = Joi.object({
    state_id: Joi.number().required(),
    city_id: Joi.number().required(),
    name: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateUpdateLocationStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};
module.exports = { validateLocationCreateData, validateLocationUpdateData, validateUpdateLocationStatus };
