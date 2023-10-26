const { Similarproject, sequelize } = require("../../db");
const { NotFoundError, BadRequestError } = require("../../utils/api-errors");


//Get data Similarproject
const doGetSimilarproject = async ({ BadRequestError }) => {
  const similarproject = await Similarproject.findAll(
    { limit: 12 }
  );

  if (similarproject[0] == 0) throw new BadRequestError("please try again");
  return similarproject;
};
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doGetSimilarprojectbytype = async ({ BadRequestError, p_typeid }) => {
  let newobject = {};
  if (p_typeid) {
    newobject.p_typeid = { [Op.like]: `%${p_typeid}%` }
  }
  const similarproject = await Similarproject.findAll(
    { where: newobject }

  );

  if (similarproject[0] == 0) throw new BadRequestError("please try again");
  return similarproject;
};




// Similar project view by id 
const doGetSimilarprojectById = async ({
  BadRequestError,
  propertyTypes,
  p_typeid
}) => {
  const similarproject = await Similarproject.findAll({
    include: [
      {
        model: propertyTypes,
      },
    ],
    where: { p_typeid }
  });

  if (similarproject[0] == 0) throw new BadRequestError("Id not match please try again");
  return similarproject;
};


module.exports = {

  doGetSimilarproject,
  doGetSimilarprojectbytype,
  doGetSimilarprojectById,
};
