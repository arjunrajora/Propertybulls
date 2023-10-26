const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateServiceCategoryCreateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateServiceCategoryUpdateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateUpdateServiceCategoryStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};
module.exports = { validateServiceCategoryCreateData,
                   validateServiceCategoryUpdateData,
                   validateUpdateServiceCategoryStatus
                   };
