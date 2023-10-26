const {
  Requirementalert,
  sequelize,
} = require('../db');

const { generateJWT, verifyJWT } = require('../utils/jwt');

const { NotFoundError, BadRequestError } = require('../utils/api-errors');




//View Requirementalert
const doGetRequirementalert = async ({ BadRequestError, propertyTypes, Location, City, State
}) => {
  const requirementalert = await Requirementalert.findAll(
    {
      include: [{ model: propertyTypes },
      { model: Location },
      { model: City },
      { model: State },
      ],
      order: [["createdAt", "DESC"]],


    }
  );
  return requirementalert
};

// Search Requirementalert
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchRequirementalert = async ({
  fname,
  phone,
  category,
  location_id,
  p_typeid,
  Requirementalert,
  BadRequestError,
  propertyTypes, Location, City, State
}) => {
  let newobject = {};
  if (fname) {
    newobject.fname = { [Op.like]: `%${fname}%` }
  }
  if (phone) {
    newobject.phone = { [Op.like]: `%${phone}%` }
  } if (category) {
    newobject.category = category
  }
  if (location_id) {
    newobject.location_id = location_id
  }
  if (p_typeid) {
    newobject.p_typeid = p_typeid
  }

  console.log("newobject", newobject);
  const data = await Requirementalert.findAll({
    where: newobject,
    order: [['fname', 'ASC']],
    include: [{ model: propertyTypes },
    { model: Location },
    { model: City },
    { model: State },
    ],
  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};



//Requirementalert deleted
const doDeleteRequirement = async ({
  id
}) => {
  const requirement = await Requirementalert.destroy({
    where: {
      id: id,
    },
  })
  if (requirement == 0) throw new BadRequestError('id not match ');
  return requirement[0];
};






module.exports = {
  doGetRequirementalert,
  doSearchRequirementalert,
  doDeleteRequirement
}

