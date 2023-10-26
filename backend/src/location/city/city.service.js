const { City, sequelize } = require("../../db");

const { generateJWT, verifyJWT } = require("../../utils/jwt");

const { NotFoundError, BadRequestError } = require("../../utils/api-errors");


// City Add
const doCity = async ({ state_id, name }) => {
  const city = await City.create({ state_id, name });
  return { cityId: city.id };
};



// View City
const doGetCity = async ({ BadRequestError, City, State }) => {
  const city = await City.findAll({
    include: { model: State },
    order: [["createdAt", "DESC"]],
  });
  if (city[0] == 0) throw new BadRequestError("Please try again later");
  return city;
};






const doDeleteCity = async ({
  id
}) => {
  const city = await City.destroy({
    where: {
      id: id,
    },
  })
  if (city == 0) throw new BadRequestError('id not match ');
  return city[0];
};

const doUpdateCity = async ({ id, City, BadRequestError, CityUpdateData }) => {
  const data = await City.update(CityUpdateData, {
    where: {
      id: id,
    },
  });
  if (data[0] == 0) throw new BadRequestError("id not match");
  return data;
};

// City View By Id
// const doGetCityById = async ({ id }) => {
//   const data = await City.findOne({
//     where: {
//       id,
//     },
//   });
//   return data;
// };

// Update City Status
const doUpdateCityStatus = async ({
  id,
  City,
  BadRequestError,
  status,

}) => {
  const data = await City.update({ status },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Please try again later');
  return data[0];
};

// Search City
// Search City
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchCity = async ({
  name,
  status,
  City,
  BadRequestError,
  State
}) => {
  let newobject = {};
  if (name) {
    newobject.name = { [Op.like]: `%${name}%` }
  }
  if (status) {
    newobject.status = status
  }

  console.log("newobject", newobject);
  const data = await City.findAll({
    where: newobject,
    include: { model: State },
    order: [['name', 'ASC']],
  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};


// view State 
const doGetState = async ({ BadRequestError, State }) => {
  const state = await State.findAll({
    order: [["createdAt", "DESC"]],
    where: { status: "Y" }
  });
  if (state[0] == 0) throw new BadRequestError("Please try again later");
  return state;
};





module.exports = {
  doCity,
  doGetCity,
  doDeleteCity,
  doUpdateCity,
  // doGetCityById,
  doUpdateCityStatus,
  doSearchCity,
  doGetState
};
