
const {
  Faq,FaqCatgory,
  sequelize,
} = require('../../db');
const { NotFoundError, BadRequestError } = require('../../utils/api-errors');


//get data Faq
const doGetFaq = async ({
  FaqCatgory,
}) => {
  const faq = await Faq.findAll(
    {   
      include: {  model: FaqCatgory},
      order: [["createdAt", "DESC"]],
  }
  );
  return faq
};

const doGetFaqCatgorybyid= async ({
  name,Faq}) => {
  const faq = await FaqCatgory.findAll({
    where: {  name},
    include: {  model: Faq}

  }
  );
  return faq
};


  const dogetFaq = async ({
    page_saluge,
    FaqCatgory,
    BadRequestError,
  }) => {
    const data = await Faq.findOne({
      where: {  page_saluge,},
      include: {  model: FaqCatgory}
    });
    if (data == null) throw new BadRequestError('Please try again later');
    return data
  };


module.exports = {
  doGetFaq,
  dogetFaq,
  doGetFaqCatgorybyid,

};

