const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};



const validateAddSeo = (data) => {
  const schema = Joi.object({
    page: Joi.string().required(),
    location: Joi.string().required(),
    title: Joi.string().required(),
    keyword: Joi.string().required(),
    description: Joi.string().required(),

  });
  return schema.validate(data, options);
};

const validateUpdatSeo = (data) => {
  const schema = Joi.object({
     page: Joi.string().required(),
     location: Joi.string().required(),
     title: Joi.string().required(),
     keyword: Joi.string().required(),
     description: Joi.string().required(),
  });
  return schema.validate(data, options);
};

const validatestatus = (data) => {
  const schema = Joi.object({
     status: Joi.string().required()
    

  });
  return schema.validate(data, options);
};
module.exports = {
  validateAddSeo,
  validateUpdatSeo,
  validatestatus
};
