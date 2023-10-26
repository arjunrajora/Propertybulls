const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateBuilderCreateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lname: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    cpass: Joi.string().required(),
    mobile: Joi.number().required(),
    occu: Joi.string().required(),
    description: Joi.string().required(),
    loc_ids: Joi.string().required(),
    role_id: Joi.number().required(),
  });
  return schema.validate(data, options);
};
const validateBuilderUpdateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lname: Joi.string().required(),
    altemail: Joi.string().allow(''),
    username: Joi.string().required(),
    mobile: Joi.number().required(),
    occu: Joi.string().required(),
    description: Joi.string().required(),
    loc_ids: Joi.string().required(),
    image: Joi.string().allow(''),
  });
  return schema.validate(data, options);
};
const validateUpdateBuilderStatus = (data) => {
  console.log(data);
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};
module.exports = { validateBuilderCreateData, validateBuilderUpdateData, validateUpdateBuilderStatus };
