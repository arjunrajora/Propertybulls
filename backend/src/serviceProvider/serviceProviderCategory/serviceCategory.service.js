
const {
  ServiceCategory,
  sequelize,
} = require('../../db');

const { generateJWT, verifyJWT } = require('../../utils/jwt');

const { NotFoundError, BadRequestError } = require('../../utils/api-errors');

// ServiceCategory Add
const doServiceCategory = async ({
  name,
  filename,
  description
}) => {

  var img = filename;

  const serviceCategory = await ServiceCategory.create(
    {
      name,
      img,
      description
    },
  );
  return {
    serviceCategoryId: serviceCategory.id
  };
};

//View ServiceCategory
const doGetServiceCategory = async ({
  BadRequestError,
  ServiceCategory,
}) => {
  const serviceCategory = await ServiceCategory.findAll({
    order: [["createdAt", "DESC"]],
  });
  if (serviceCategory[0] == 0) throw new BadRequestError('Please try again later');
  return serviceCategory;
};

// Update ServiceCategory
const doUpdateServiceCategory = async ({
  id,
  ServiceCategory,
  BadRequestError,
  ServiceCategoryUpdateData,
  filename
}) => {

  var img = filename;
  const { name, description, } = ServiceCategoryUpdateData;
  if (img != null) {
    const data = await ServiceCategory.update({ name, description, img },
      {

        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  } else {
    const data = await ServiceCategory.update({ name, description },
      {

        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  }



};

// Delete ServiceCategory
const doDeleteServiceCategory = async ({
  id,
  BadRequestError,
}) => {
  const data = await ServiceCategory.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

// ServiceCategory View By Id
const doGetServiceCategoryById = async ({
  id,
}) => {
  const data = await ServiceCategory.findOne({
    where: {
      id,
    },
  });
  return data;
};

// Update ServiceCategory Status
const doUpdateServiceCategoryStatus = async ({
  id,
  ServiceCategory,
  BadRequestError,
  status
}) => {
  const data = await ServiceCategory.update({ status },
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
  doServiceCategory,
  doGetServiceCategory,
  doUpdateServiceCategory,
  doDeleteServiceCategory,
  doGetServiceCategoryById,
  doUpdateServiceCategoryStatus
};

