const {
    Role,
    sequelize,
  } = require('../db');
  
  const { generateJWT, verifyJWT } = require('../utils/jwt');
  
  const { NotFoundError, BadRequestError } = require('../utils/api-errors');




  //View Role
const doGetRole = async ({
    BadRequestError,
    Role,
  }) => {
    const role = await Role.findAll({
    });
    if (role[0] == 0) throw new BadRequestError('Please try again later');
    return role;
  };


  module.exports ={
    doGetRole
  }