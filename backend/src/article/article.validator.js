const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateArticleCreateData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),   
   
    content: Joi.string().required(),   
  });
  return schema.validate(data, options);
};
const validateArticleUpdateData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),  
    image: Joi.string().required(),   

  });
  return schema.validate(data, options);
};
const validateUpdateArticleStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};

module.exports = { 
           validateArticleCreateData,
           validateArticleUpdateData,
           validateUpdateArticleStatus
          };
