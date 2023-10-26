
const {
  Type,
  sequelize,
} = require('../db');
const { NotFoundError, BadRequestError } = require('../utils/api-errors');

// FAQ Add
const doType = async ({
  type
}) => {
  const faq = await Type.create(
    {
      type

    },

  );

  return {
    faqId: faq.id
  };
};

//get data Faq
const doGetType = async ({
}) => {
  const faq = await Type.findAll( 
  );
  return faq
};


//Edit data in faq

  const doEditFaq = async ({
    id,
    BadRequestError,
  }) => {
    const data = await Faq.findOne({
      where: {
       id,
      },
    });
    if (data == null) throw new BadRequestError('Please try again later');
    return data
  };


  //update data in faq
  const doUpdateFaq = async ({
    id,
    Faq,
    BadRequestError,
    faqdata
  }) => {
    const data = await Faq.update(  faqdata,

      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  };


    //status data in faq
    const doStatus = async ({
      id,
      BadRequestError,
    status
    }) => {
      const data = await Faq.update(  {status},
        {
          where: {
            id: id,
          },
        },
      );
      if (data[0] == 0) throw new BadRequestError("Id Not Match");
      return data[0];
    };
  
  //delete data in faq

const doDeleteFaq = async ({
  id
}) => {
 const data = await Faq.destroy({
    where: {
      id: id,
    },
  })
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


module.exports = {
  doType,
  doGetType,
    doDeleteFaq,
  doUpdateFaq,
  doEditFaq,
  doStatus
};

