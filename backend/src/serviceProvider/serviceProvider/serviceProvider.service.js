
const {
  ServiceProvider,
  sequelize,
} = require('../../db');

const { generateJWT, verifyJWT } = require('../../utils/jwt');

const { NotFoundError, BadRequestError } = require('../../utils/api-errors');

// ServiceProvider Add
const doServiceProvider = async ({
  category,
  email,
  name,
  company_name,
  company_url,

  start,
  per_name,
  person_image,
  landline,
  mobile,
  address,
  state_id,
  city_id,
  location_id,
  description,
  filename

}) => {

  var company_logo = filename;

  const serviceProvider = await ServiceProvider.create(
    {
      category,
      email,
      name,
      company_name,
      company_url,
      company_logo,
      start,
      per_name,
      person_image,
      landline,
      mobile,
      address,
      state_id,
      city_id,
      location_id,
      description,

    },
  );
  return {
    serviceProviderId: serviceProvider.id
  };
};

//View ServiceProvider
const doGetServiceProvider = async ({
  BadRequestError,
  ServiceProvider,
}) => {
  const serviceProvider = await ServiceProvider.findAll({
    order: [["createdAt", "DESC"]],
  });
  if (serviceProvider[0] == 0) throw new BadRequestError('Please try again later');
  return serviceProvider;
};






// Update ServiceProvider

const doUpdateServiceProvider = async ({
  id,
  ServiceProvider,
  BadRequestError,
  ServiceProviderUpdateData,
  filename,
}) => {
  var company_logo = filename;
  const { category,
    email,
    name,
    company_name,
    company_url,
    // company_logo,
    start,
    per_name,
    person_image,
    landline,
    mobile,
    address,
    state_id,
    city_id,
    location_id,
    description,
  } = ServiceProviderUpdateData;

  if (company_logo !== null) {
    const data = await ServiceProvider.update({
      category,
      email,
      name,
      company_name,
      company_url,
      company_logo,
      start,
      per_name,
      person_image,
      landline,
      mobile,
      address,
      state_id,
      city_id,
      location_id,
      description,
    }, {
      where: {
        id: id,
      },

    });
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  } else {
    const data = await ServiceProvider.update({
      category,
      email,
      name,
      company_name,
      company_url,
      start,
      per_name,
      person_image,
      landline,
      mobile,
      address,
      state_id,
      city_id,
      location_id,
      description,
    }, {
      where: {
        id: id,
      },
    });
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  }

}













// Search ServiceProvider
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchServiceProvider = async ({
  company_name,
  mobile,
  status,
  category,
  ServiceProvider,
  BadRequestError,
}) => {
  let newobject = {};
  if (company_name) {
    newobject.company_name = { [Op.like]: `%${company_name}%` }
  } if (mobile) {
    newobject.mobile = { [Op.like]: `%${mobile}%` }
  } if (status) {
    newobject.status = status
  } if (category) {
    newobject.category = category
  }
  console.log("newobject", newobject);
  const data = await ServiceProvider.findAll({
    where: newobject,
    order: [['name', 'ASC']],
  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};

// Delete ServiceProvider
const doDeleteServiceProvider = async ({
  id,
  BadRequestError,
}) => {
  const data = await ServiceProvider.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

// ServiceProvider View By Id
const doGetServiceProviderById = async ({
  id,
}) => {
  const data = await ServiceProvider.findOne({
    where: {
      id,
    },
  });
  return data;
};

// Update ServiceProvider Status
const doUpdateServiceProviderStatus = async ({
  id,
  ServiceProvider,
  BadRequestError,
  status
}) => {
  const data = await ServiceProvider.update({ status },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Please try again later');
  return data[0];
};

module.exports = {
  doServiceProvider,
  doGetServiceProvider,
  doUpdateServiceProvider,
  doSearchServiceProvider,
  doDeleteServiceProvider,
  doGetServiceProviderById,
  doUpdateServiceProviderStatus
};

