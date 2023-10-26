const { VisibilityMatrix, sequelize, } = require("../db");
const { generateJWT, verifyJWT } = require("../utils/jwt");
const { NotFoundError, BadRequestError } = require("../utils/api-errors");
const {BuilderRegisteredTemplate } = require("../utils/email-templates");
// Builder Add
const doVisibilityMatrix = async ({ VisibilityMatrixdata }) => {

  for (const row of VisibilityMatrixdata) {
    const { role_id, package_id, ordernumber } = row;
    await VisibilityMatrix.destroy({
      where:{role_id}
    })
  }
  for (const row of VisibilityMatrixdata) {
    const { role_id, package_id, ordernumber } = row;
    if (typeof ordernumber === 'object' && Object.keys(ordernumber).length === 0) {
      continue;
    }
    const ordernumberAsInt = parseInt(ordernumber, 10);
    await VisibilityMatrix.create({
      role_id,
      profilepack_id: package_id,
      ordernumber: ordernumberAsInt,
    });
  }

  return true;
};



const dogetVisibilityMatrix = async ({ VisibilityMatrix,BadRequestError }) => {

   const  VisibilityMatrixdata= await VisibilityMatrix.findAll({
    VisibilityMatrix
    });
    return VisibilityMatrixdata
  }






module.exports = {
  doVisibilityMatrix,
  dogetVisibilityMatrix

};
