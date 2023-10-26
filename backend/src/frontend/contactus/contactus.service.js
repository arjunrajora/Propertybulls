
const {
  Contactus,
  sequelize,
} = require('../../db');

const { generateJWT, verifyJWT } = require('../../utils/jwt');

const { NotFoundError, BadRequestError } = require('../../utils/api-errors');



//View Contactus
const doGetContactus = async ({
  BadRequestError,


}) => {
  const staticpage = await Contactus.findOne({
    where: {
      id: 1
    }, limit: 1
  });
  if (staticpage == '') throw new BadRequestError('Please try again later');
  return staticpage;
};






module.exports = {

  doGetContactus,


};

