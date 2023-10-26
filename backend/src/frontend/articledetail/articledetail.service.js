
const {
  Articledetail,
  sequelize,
} = require('../../db');

const { generateJWT, verifyJWT } = require('../../utils/jwt');

const { NotFoundError, BadRequestError } = require('../../utils/api-errors');

const Sequelize = require("sequelize");
const Op = Sequelize.Op;



const doGetArticledetail = async ({
  Articledetail,
  BadRequestError,
  url
}) => {
  const data = await Articledetail.findOne({
    where: {
      status: "Y",
      url,
    },
  });
  if (data == null) throw new BadRequestError('Please try again later');
  return data
};


module.exports = {

  doGetArticledetail,

};

