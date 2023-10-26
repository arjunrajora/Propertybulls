const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddLetterData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data, options);
};

const validateUpdateLetterData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data, options);
};







module.exports ={
  validateAddLetterData,
  validateUpdateLetterData
}
