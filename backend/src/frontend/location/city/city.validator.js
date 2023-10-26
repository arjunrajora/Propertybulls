const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddCityData = (data) => {
  const schema = Joi.object({
    state_id: Joi.string().required(),
    name: Joi.string().required(),
  });
  return schema.validate(data, options);
};


module.exports ={
  validateAddCityData
}
