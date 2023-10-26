const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateFileName = (data) => {
  const schema = Joi.object({
    fileName: Joi.string()
      // .pattern(/^[\w,\s-]+\.[A-Za-z]{3,4}$/)
      .required()
      .messages({
        'string.pattern.base': 'Provide a valid file name!',
      }),
  });
  return schema.validate(data, options);
};

module.exports = {
  validateFileName,
};
