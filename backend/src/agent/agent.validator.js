const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAgentCreateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lname: Joi.string().required(),
    username: Joi.string().required(),
    companyname: Joi.string().allow(''),
    mobile: Joi.number().required(),
    loc_ids: Joi.string().required(),
    role_id: Joi.number().required(),
    state_id: Joi.string().required(),
    city_id: Joi.string().required(),
  });
  return schema.validate(data, options);
};
const validateAgentUpdateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lname: Joi.string().required(),
    username: Joi.string().required(),
    companyname: Joi.string().allow(''),
    mobile: Joi.number().required(),
    state_id: Joi.number().required(),
    city_id: Joi.number().required(),
    loc_ids: Joi.string().required(),

  });
  return schema.validate(data, options);
};


const  validateAgentStatus= (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};


module.exports = { validateAgentCreateData, 
  validateAgentStatus,
  validateAgentUpdateData };
