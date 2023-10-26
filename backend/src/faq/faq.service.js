
const {
  Faq,FaqCatgory,
  sequelize,
} = require('../db');
const { NotFoundError, BadRequestError } = require('../utils/api-errors');

// FAQ Add
const doFaq = async ({   question,
  description,
  faq_category,
  page_saluge,
  answer}) => {
  const data = await Faq.findOne({
    where: {
      page_saluge,
    },
  })
  if (data&&data.dataValues.page_saluge== page_saluge) throw new BadRequestError('you are allredy Page url')
  const faq = await Faq.create({
    question,
    description,
    faq_category,
    page_saluge,
    answer
  });

  return {
    faqId: faq.id
  };
};

//get data Faq
const doGetFaq = async ({
}) => {
  const faq = await Faq.findAll(
    {    order: [["createdAt", "DESC"]],
  }
  );
  return faq
};

const doGetFaqCatgory= async ({
}) => {
  const faq = await FaqCatgory.findAll(
    {   
  }
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

  const Sequelize = require("sequelize");
  const Op = Sequelize.Op;
  //update data in faq
  const doUpdateFaq = async ({
    id,
    Faq,
    BadRequestError,
    faqdata
  }) => {
    const page_saluge= faqdata.page_saluge;
        const datas = await Faq.findOne({
      where: {
        page_saluge,
      id: { [Op.ne]: id }
      },
    })
    if (datas) {
      throw new BadRequestError(' This page url Allredy exists');
    }
  
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
// Update Featured
const doUpdateFeatured = async ({
  id,
  Builder,
  BadRequestError,
  featured
}) => {
  const data = await Faq.update({ featured },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};

const dogetFaqbyid = async ({
  id,
  FaqCatgory,
  BadRequestError,
}) => {
  const data = await Faq.findOne({
    where: {  id},
  });
  if (data == null) throw new BadRequestError('Please try again later');
  return data
};




module.exports = {
  doFaq,
  doGetFaq,
  doDeleteFaq,
  doUpdateFaq,
  doEditFaq,
  doStatus,
  doGetFaqCatgory,
  doUpdateFeatured,
  dogetFaqbyid
};

