const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddFaq = (data) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    faq_category: Joi.number().required(),
    description: Joi.string().required(),
    answer: Joi.string().required(),
    page_saluge: Joi.string().required(),
  });
  return schema.validate(data, options);
};
const validateUpdateFaq = (data) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    faq_category: Joi.number().required(),
    description: Joi.string().required(),
    answer: Joi.string().required(),
    page_saluge: Joi.string().required(),
  });
  return schema.validate(data, options);
};
const validateFaqStatus = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};


module.exports = {
  validateAddFaq,
  validateUpdateFaq,
  validateFaqStatus
};
