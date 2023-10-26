
const {
  Facing,
  sequelize,
} = require('../../db');
const { NotFoundError, BadRequestError } = require('../../utils/api-errors');

// PropertyFacing Add
const doPropertyFacing = async ({
  name,
  description
}) => {
  const facing = await Facing.create(
    {
      name,
  description
    },

  );

  return {
    facingId: facing.id
  };
};

//get data PropertyFacing 
const doGetPropertyFacing = async ({
}) => {
  const faq = await Facing.findAll({
    order: [["createdAt", "DESC"]],

  }
  );
  return faq
};


  //update data in PropertyFacing
  const doUpdatePropertyFacing = async ({
    id,
    Facing,
    BadRequestError,
    facingdata
  }) => {
    const data = await Facing.update(  facingdata,

      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  };


    //status data in PropertyFacing
    const doStatus = async ({
      id,
      BadRequestError,
    status
    }) => {
      const data = await Facing.update(  {status},
        {
          where: {
            id: id,
          },
        },
      );
      if (data[0] == 0) throw new BadRequestError("Id Not Match");
      return data[0];
    };
  
  //delete data PropertyFacing

const doDeletePropertyFacing = async ({
  id
}) => {
 const data = await Facing.destroy({
    where: {
      id: id,
    },
  })
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


module.exports = {
  doPropertyFacing,
  doGetPropertyFacing,
  doDeletePropertyFacing,
  doUpdatePropertyFacing,
  doStatus
};

