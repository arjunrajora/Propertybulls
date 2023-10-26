// const {
//   JWT_ACCESS_TOKEN_SECRET,
//   ACCESS_TOKEN_EXPIRES_IN,
//   SIGN_OPTION,
// } = require('config');

const {
  Location,
  sequelize,
} = require('../../../db');

const { generateJWT, verifyJWT } = require('../../../utils/jwt');

const { NotFoundError, BadRequestError } = require('../../../utils/api-errors');




//View Location
const doGetLocation = async ({
  BadRequestError,
  Location,
  City
}) => {
  const location = await Location.findAll({});
  if (location[0] == 0) throw new BadRequestError('Please try again later');
  return location;
};







module.exports = {

  doGetLocation,

};

