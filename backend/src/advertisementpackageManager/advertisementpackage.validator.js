const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAdvertisementPackageCreateData = (data) => {
  const schema = Joi.object({
    page: Joi.string().required(),
    banner_position_id: Joi.string().required(),
    duration: Joi.string().required(),
    discount_price: Joi.string().required(),
    amount: Joi.string().required(),
    banner_size: Joi.string().required(),
  });
  return schema.validate(data, options);
};
const validateBuilderUpdateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lname: Joi.string().required(),
    altemail: Joi.string().allow(''),
    username: Joi.string().required(),
    mobile: Joi.number().required(),
    occu: Joi.string().required(),
    description: Joi.string().required(),
    loc_ids: Joi.string().required(),
    image: Joi.string().allow(''),
  });
  return schema.validate(data, options);
};
const validateUpdateAdvertisementPackageStatus = (data) => {
  console.log(data);
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(data, options);
};
module.exports = { validateAdvertisementPackageCreateData, validateBuilderUpdateData, validateUpdateAdvertisementPackageStatus };
