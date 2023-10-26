const { City, sequelize } = require("../../../db");
const { generateJWT, verifyJWT } = require("../../../utils/jwt");

const { NotFoundError, BadRequestError } = require("../../../utils/api-errors");
const city = require(".");
const c = require("config");


const doGetCity = async ({
  BadRequestError,
  City
}) => {
  const city = await City.findAll({});
  if (city[0] == 0) throw new BadRequestError('Please try again later');
  return city;
};




// City View By Id








module.exports = {
 
  doGetCity,
 
};
