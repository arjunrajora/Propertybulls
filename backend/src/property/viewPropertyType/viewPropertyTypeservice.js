
const {
  propertyTypes,
  sequelize,
} = require('../../db');
const { NotFoundError, BadRequestError } = require('../../utils/api-errors');

// PropertyFacing Add
const doPropertyType= async ({
  name,
  description,
  
}) => {
  const propertytypes = await propertyTypes.create(
    {
      name,
      description,
      
    },

  );

  return {
    tpropertytypesId: propertytypes.id
  };
};

//get data Propertytypes 
const doGetPropertyType= async ({

 
}) => {
  const propertytypes = await propertyTypes.findAll(
    {    order: [["createdAt", "DESC"]],  }
  );
  return propertytypes
};



  //update data in types
  const doUpdatePropertyType = async ({
    id,
    types,
    BadRequestError,
    typesdata
  }) => {
    const data = await propertyTypes.update( typesdata,

      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  };


    //status data in types
    const doStatus = async ({
      id,
      BadRequestError,
    status
    }) => {
      const data = await propertyTypes.update(  {status},
        {
          where: {
            id: id,
          },
        },
      );
      if (data[0] == 0) throw new BadRequestError("Id Not Match");
      return data[0];
    };
  
  //delete data in types

const doDeletePropertyType = async ({
  id
}) => {
 const data = await propertyTypes.destroy({
    where: {
      id: id,
    },
  })
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


module.exports = {
  doPropertyType,
  doGetPropertyType,
  doUpdatePropertyType,
  doDeletePropertyType,
  doStatus
};

