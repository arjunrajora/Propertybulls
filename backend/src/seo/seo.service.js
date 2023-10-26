
const {
  Seo,
  sequelize,
} = require('../db');

// Seo Add
const doAddSeo = async ({
  page,
  location,
  title,
  keyword,
  description,
}) => {
  const seo = await Seo.create(
    {
      page,
      location,
      title,
      keyword,
      description,
    },

  );

  return {
  SeoId: seo.id
  };
};

 //Get data Seo
const doGetSeo = async ({
  BadRequestError
}) => {
  const seo = await Seo.findAll(
  );
  if(seo[0]==0 )throw new BadRequestError("please try again")
  return seo
};
 //Edit data in Seo

 
 const doEditSeo = async ({
   id,
 }) => {
   const data = await Seo.findOne({
     where: {
      id,
     },
   });
   return data;
 };


//   Update data in Seo
  const doUpdateSeo= async ({
    id,
  
    BadRequestError,
    SeoUpdateData
  }) => {
    const data = await Seo.update(  SeoUpdateData,
      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError('id is not match');
    return data[0];
  };

  const dostatus= async ({
    id,
  
    BadRequestError,
    status
  }) => {
    const data = await Seo.update(  {status},
      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError('id is not match');
    return data[0];
  };

//   //delete data in Seo

const doDeleteSeo = async ({
  id,
BadRequestError
}) => {
  const seo =await Seo.destroy({
    where: {
      id: id,
    },
  })
  if (seo == 0) throw new BadRequestError(' id is not match');
  return seo[0];
};

module.exports = {
  doAddSeo,
  doGetSeo,
  doEditSeo,
  doUpdateSeo,
  doDeleteSeo,
  dostatus
  
};

