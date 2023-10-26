

const { Location, sequelize } = require("../../db");

const { generateJWT, verifyJWT } = require("../../utils/jwt");

const { NotFoundError, BadRequestError } = require("../../utils/api-errors");

// Location Add
const doLocation = async ({ state_id, city_id, name }) => {
  const location = await Location.create({
    state_id,
    city_id,
    name,
  });
  return {
    locationId: location.id,
  };
};

//View Location
const doGetLocation = async ({ BadRequestError, Location, City }) => {
  const location = await Location.findAll({
    include: { model: City },
    order: [["createdAt", "DESC"]],
  });
  if (location[0] == 0) throw new BadRequestError("Please try again later");
  return location;
};

// Update Location
const doUpdateLocation = async ({
  id,
  Location,
  BadRequestError,
  LocationUpdateData,
}) => {
  const data = await Location.update(LocationUpdateData, {
    where: {
      id: id,
    },
  });
  if (data[0] == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

// Search Location
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchLocation = async ({
  name,
  status,
  BadRequestError,
  City
}) => {
  let newobject = {};
  if (name) {
    newobject.name = { [Op.like]: `%${name}%` }
  }
  if (status) {
    newobject.status = status
  }
  console.log("newobject", newobject);
  const data = await Location.findAll({
    where: newobject,
    order: [['name', 'ASC']],
    include: { model: City },
  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};


// Delete Location
const doDeleteLocation = async ({ id, BadRequestError }) => {
  const data = await Location.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

// Location View By Id
const doGetLocationById = async ({ id }) => {
  const data = await Location.findOne({
    where: {
      id,
    },
  });
  return data;
};

// Update Location Status
const doUpdateLocationStatus = async ({
  id,
  Location,
  BadRequestError,
  status,
}) => {
  const data = await Location.update(
    { status },
    {
      where: {
        id: id,
      },
    }
  );
  if (data[0] == 0) throw new BadRequestError("Please try again later");
  return data[0];
};




// view City 
const doGetCity = async ({ BadRequestError, City }) => {
  const city = await City.findAll({
    order: [["createdAt", "DESC"]],
    where: { status: "Y" }
  });
  if (city[0] == 0) throw new BadRequestError("Please try again later");
  return city;
};



module.exports = {
  doLocation,
  doGetLocation,
  doUpdateLocation,
  doSearchLocation,
  doDeleteLocation,
  doGetLocationById,
  doUpdateLocationStatus,
  doGetCity
};
