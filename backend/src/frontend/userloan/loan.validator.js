
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

const validateloanrequrie = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    mobile: Joi.number().required(),
    loan_type: Joi.number().required(),
    email: Joi.string().required(),
    user_type: Joi.number().required(),
    gross_salary: Joi.string().required(),
    monthly_salary: Joi.string().required(),
    dob: Joi.string().required(),
    location: Joi.string().required(),



  });
  return schema.validate(data, options);
};
// const validateloanrequrie= (data) => {
//   const schema = Joi.object({
//     name: Joi.string().required(),
//     user_type:Joi.string().require(),
//     email: Joi.string().required(),
//     loan_type: Joi.string().required(),
//     gross_salary: Joi.string().required(),
//     monthly_salary: Joi.string().required(),
//     dob: Joi.string().required(),
//     location: Joi.string().required(),
//     mobile: Joi.string().required(),

    
//   });
//   return schema.validate(data, options);
// };


module.exports ={
    validateUpdateStatus,
    validateloanrequrie
}