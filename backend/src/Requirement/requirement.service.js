
const {
  Requirement,
  sequelize,
  Location,

} = require('../db');

const { generateJWT, verifyJWT } = require('../utils/jwt');

const { NotFoundError, BadRequestError } = require('../utils/api-errors');

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
  description,
  creater
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
      creater
    },
  );
  return {
    requirementId: requirement.id
  };
};

//View Requirement
const doGetRequirement = async ({
  BadRequestError,
  Requirement,
  Location,
  City,
  State,
  User,
  Role,
  propertyTypes
}) => {
  const requirement = await Requirement.findAll(
    // order: [["createdAt", "DESC"]],
    {
      include: [
        { model: Location },
        { model: City },
        { model: State },
        {
          model: User,
          include: [{
            model: Role,
          }]
        },
        { model: propertyTypes },

      ],

      order: [["createdAt", "DESC"]],

    }




  );
  if (requirement[0] == 0) throw new BadRequestError('Please try again later');
  return requirement;
};

// Update Requirement
const doUpdateRequirement = async ({
  id,
  Requirement,
  BadRequestError,
  RequirementUpdateData
}) => {
  const data = await Requirement.update(RequirementUpdateData,
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

// Delete Requirement
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

// Requirement View By Id
const doGetRequirementById = async ({
  id,
}) => {
  const data = await Requirement.findOne({
    where: {
      id,
    },
  });
  return data;
};

// Update Requirement Status
const doUpdateRequirementStatus = async ({
  id,
  Requirement,
  BadRequestError,
  status
}) => {
  const data = await Requirement.update({ status },
    {
      where: {
        id: id,
      }
    });
  if (data[0] == 0) throw new BadRequestError("I'd Not Match");
  return data;
};


// Search Requirement
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchRequirement = async ({
  state_id,
  city_id,
  location_id,
  cus_id,
  p_typeid,
  category,
  Requirement,
  BadRequestError,
  Location,
  City,
  State,
  User,
  Role,
  propertyTypes
}) => {
  let newobject = {};
  if (state_id) {
    newobject.state_id = { [Op.like]: `%${state_id}%` }
  }
  if (city_id) {
    newobject.city_id = city_id
  }
  if (location_id) {
    newobject.location_id = location_id
  } if (cus_id) {
    newobject.cus_id = cus_id
  } if (p_typeid) {
    newobject.p_typeid = p_typeid
  }
  if (category) {
    newobject.category = category
  }

  console.log("newobject", newobject);
  const data = await Requirement.findAll({
    where: newobject,
    include: [
      { model: Location },
      { model: City },
      { model: State },
      {
        model: User,
        include: [{
          model: Role,
        }]
      },
      { model: propertyTypes },

    ],
  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};



















module.exports = {
  doRequirement,
  doGetRequirement,
  doUpdateRequirement,
  doDeleteRequirement,
  doGetRequirementById,
  doUpdateRequirementStatus,
  doSearchRequirement,
};

