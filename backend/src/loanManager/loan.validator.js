
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateUpdateStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
    
  });
  return schema.validate(data, options);
};


module.exports ={
    validateUpdateStatus
}