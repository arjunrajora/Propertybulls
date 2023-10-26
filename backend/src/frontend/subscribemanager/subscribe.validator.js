const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddSubscribeData = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),


  });
  return schema.validate(data, options);
};








module.exports = {
  validateAddSubscribeData,

}
