
const {
  State,
  sequelize,
} = require('../../../db');
const { NotFoundError, BadRequestError } = require('../../../utils/api-errors');



// Gat Data in State
const doGetState = async ({
}) => {
  const faq = await State.findAll(
  );
  if (faq == null) throw new BadRequestError('Please try again later');
    return faq
};

  

  


module.exports = {

  doGetState,

};

