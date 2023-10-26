
const {
  Requirement,
  propertyTypes,
  sequelize,
} = require('../../db');

const { generateJWT, verifyJWT } = require('../../utils/jwt');

const { NotFoundError, BadRequestError } = require('../../utils/api-errors');

// Requirement Add
const doRequirement = async ({
    category,
    p_typeid,
    state_id,
    city_id,
    location_id,
    cus_id,
    min_budget,
    max_budget,
    min_area,
    max_area,
    max_room,
    min_room,
    description,
    creater,
    unit
}) => {
    const requirement = await Requirement.create(
      {
        category,
        p_typeid,
        state_id,
        city_id,
        location_id,
        cus_id,
        min_budget,
        max_budget,
        min_area,
        max_area,
        description,
        max_room,
        min_room,
        creater,
        unit
      },
    );
    return {
      requirementId: requirement.id
    };
};

const doDeleteRequirement = async ({
  id,
  BadRequestError,
}) => {
  const data = await Requirement.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};



const doGetRequirementbyId = async ({
  cus_id,
  propertyTypes
}) => {
  const data = await Requirement.findAll({
where:{
  cus_id
},    include: { model: propertyTypes },


  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data;
};

const doGetRequirements= async ({
  Requirement,
  propertyTypes
}) => {
  const features = await Requirement.findAll({
    include: { model: propertyTypes },
    order: [['created', 'DESC']],

  });
  return features
};

// view data by  buy 
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doGetRequirementbuycategory = async ({ cus_id, category,propertyTypes

}) => {

  const data = await Requirement.findAll({
    where: {
      cus_id:cus_id,
      [Op.or]: [
        { category:category}
      ],
    },    include: { model: propertyTypes },
    order: [['created', 'DESC']],


  });
  return data
}

module.exports = {
  doRequirement,
  doGetRequirementbyId,
  doGetRequirements,
  doDeleteRequirement,
  doGetRequirementbuycategory
};
