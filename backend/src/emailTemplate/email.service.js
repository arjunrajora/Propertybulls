
const {
  Email,
  sequelize,
} = require('../db');

const { generateJWT, verifyJWT } = require('../utils/jwt');

const { NotFoundError, BadRequestError } = require('../utils/api-errors');

// Email Add
const doEmail = async ({
  title,
  subject,
  description
}) => {
    const email = await Email.create(
      {
    title,
    subject,
    description
      },
    );
    return {
      emailId: email.id
    };
};

//View Email
const doGetEmail = async ({
  BadRequestError,
  Email,
}) => {
  const email = await Email.findAll({
    order: [["createdAt", "DESC"]],

  });
  if (email[0] == 0) throw new BadRequestError('Please try again later');
  return email;
};

// Update Email
const doUpdateEmail = async ({
  id,
  Email,
  BadRequestError,
  EmailUpdateData
}) => {
  const data = await Email.update(  EmailUpdateData,
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};

// Delete Email
const doDeleteEmail = async ({
  id,
  BadRequestError,
}) => {
  const data = await Email.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};

// Email View By Id
const doGetEmailById = async ({
  id,
}) => {
  const data = await Email.findOne({
    where: {
     id,
    },
  });
  return data;
};

// Update Email Status
const doUpdateEmailStatus = async ({
  id,
  Email,
  BadRequestError,
  status
}) => {
  const data = await Email.update(  {status},
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Please try again later');
  return data[0];
};


const doGetEmaildescription = async ({
  BadRequestError,
  Email,
  id
}) => {
  const viw = await Email.findOne({
          where:{
            id:id
          }
  });
  return viw;
};

module.exports = {
  doEmail,
  doGetEmail,
  doUpdateEmail,
  doDeleteEmail,
  doGetEmailById,
  doUpdateEmailStatus,
  doGetEmaildescription
};

