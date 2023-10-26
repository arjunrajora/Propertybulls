const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateRequirementCreateData = (data) => {
  const schema = Joi.object({
    category: Joi.string().required(),
    p_typeid: Joi.number().required(),
    state_id: Joi.number().required(),
    city_id: Joi.number().required(),
    location_id: Joi.number().required(),
    cus_id: Joi.number().required(),
    min_budget: Joi.number().required(),
    max_budget: Joi.number().required(),
    min_area: Joi.number().required(),
    max_area: Joi.number().required(),
    description: Joi.string().required(),
    creater: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateRequirementUpdateData = (data) => {
  const schema = Joi.object({
    category: Joi.string().required().messages(
    'Category is required!'
    ),    p_typeid: Joi.number().required(),
    state_id: Joi.number().required(),
    city_id: Joi.number().required(),
    location_id: Joi.number().required(),
    cus_id: Joi.number().required(),
    min_budget: Joi.number().required(),
    max_budget: Joi.number().required(),
    min_area: Joi.number().required(),
    max_area: Joi.number().required(),
    description: Joi.string().required(),
    creater: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateUpdateRequirementStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};
module.exports = { validateRequirementCreateData,
                   validateRequirementUpdateData,
                   validateUpdateRequirementStatus
                   };
