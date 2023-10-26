const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateServiceProviderCreateData = (data) => {
  const schema = Joi.object({
    category: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    company_name: Joi.string().required(),
    company_url: Joi.string().required(),
   
    start: Joi.string().required(),
    per_name: Joi.string().required(),
   
    landline: Joi.string().required(),
    mobile: Joi.string().required(),
    address: Joi.string().required(),
    state_id: Joi.string().required(),
    city_id: Joi.string().required(),
    location_id: Joi.string().required(),
    description: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateServiceProviderUpdateData = (data) => {
  const schema = Joi.object({
    category: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    company_name: Joi.string().required(),
    company_url: Joi.string().required(),
    
    start: Joi.string().required(),
    per_name: Joi.string().required(),
   
    landline: Joi.string().required(),
    mobile: Joi.string().required(),
    address: Joi.string().required(),
    state_id: Joi.string().required(),
    city_id: Joi.string().required(),
    location_id: Joi.string().required(),
    description: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateUpdateServiceProviderStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};
module.exports = { validateServiceProviderCreateData, 
                   validateServiceProviderUpdateData,
                   validateUpdateServiceProviderStatus
                   };
