const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validatePropertyFacing = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data, options);
};

const validateUPdatePropertyFacing = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data, options);
};

const validateFacingStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};


module.exports = {
  validatePropertyFacing,
   validateUPdatePropertyFacing,
   validateFacingStatus
};
