const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddSlider = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    //name: Joi.string().required(),
  });
  return schema.validate(data, options);
};
const validateUpdateSlider = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
  });
  return schema.validate(data, options);
};
const validateStatusSlider = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  
  });
  return schema.validate(data, options);
};


module.exports = {
  validateAddSlider,
  validateUpdateSlider,
  validateStatusSlider
};
