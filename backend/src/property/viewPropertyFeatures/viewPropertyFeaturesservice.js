
const {
  Features,
  sequelize,
} = require('../../db');
const { NotFoundError, BadRequestError } = require('../../utils/api-errors');

// PropertyFacing Add
const doPropertyFeatures= async ({
  name,
  description,
  type
}) => {
  const features = await Features.create(
    {
      name,
      description,
      type
    },

  );

  return {
    FeaturesId: features.id
  };
};

//get data PropertyFeatures 
const doGetPropertyFeatures= async ({

  Features,
  Type
}) => {
  const features = await Features.findAll({
    include: { model: Type },
    order: [["createdAt", "DESC"]],

  });
  return features
};



  //update data in Features
  const doUpdatePropertyFeatures = async ({
    id,
    Features,
    BadRequestError,
    Featuresdata
  }) => {
    const data = await Features.update( Featuresdata,

      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  };


    //status data in Features
    const doStatus = async ({
      id,
      BadRequestError,
    status
    }) => {
      const data = await Features.update(  {status},
        {
          where: {
            id: id,
          },
        },
      );
      if (data[0] == 0) throw new BadRequestError("Id Not Match");
      return data[0];
    };
  
  //delete data in Features

const doDeletePropertyFeatures = async ({
  id
}) => {
 const data = await Features.destroy({
    where: {
      id: id,
    },
  })
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


module.exports = {
  doPropertyFeatures,
  doGetPropertyFeatures,
  doUpdatePropertyFeatures,
  doDeletePropertyFeatures,
  doStatus
};

