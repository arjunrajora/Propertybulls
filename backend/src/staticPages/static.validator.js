const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddStaticData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    content: Joi.string().required(),

  });
  return schema.validate(data, options);
};



const validateUpdateStaticData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    content: Joi.string().required(),

  });
  return schema.validate(data, options);
};

const validateUpdateStaticStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required()
   

  });
  return schema.validate(data, options);
};




module.exports ={
  validateAddStaticData,
  validateUpdateStaticData,
  validateUpdateStaticStatus,
}
