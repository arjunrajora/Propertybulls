const { BannerPosition,Advertisementsubscription, Advertisement,sequelize} = require("../db");
const { NotFoundError, BadRequestError } = require("../utils/api-errors");
// AdvertisementPackage Add
const doAdvertisementsubscription= async ({
  page,
  duration,
  discount,
  banner,
  email,
  mobile,
  redirect_link,
   name,
  advertisement_id,
  actual_amount,
  package_amount,
   end_date,
   start_date,
  position,
  PayerID,
  reference,
}) => {
  const AdvertisementPackage = await Advertisementsubscription.create({
    page,
    duration,
    discount,
    banner,
    email,
    mobile,
    redirect_link,
     name,
    advertisement_id,
    actual_amount,
    package_amount,
     end_date,
     start_date,
    position,
    PayerID,
    reference,
  });
  return {
    AdvertisementsubscriptionId: AdvertisementPackage.id};
};

// View BannerPosition
const doGetAdvertisementPackage= async ({ BadRequestError,BannerPosition}) => {
  const GetData = await Advertisement.findAll({

    order: [["createdAt", "DESC"]],

  });
  if (GetData[0] == 0) throw new BadRequestError("Please try again later");
  return GetData;
};


const doGetBannerPositionByPage= async ({ BadRequestError,BannerPosition,page}) => {
  const GetData = await Advertisement.findAll({
    where:{page:page},
    include:{model:BannerPosition}
  });
  if (GetData[0] == 0) throw new BadRequestError("Please try again later");
  return GetData;
};



const doGetDurationByBannerPosition= async ({ BadRequestError,banner_position_id}) => {
  const GetData = await Advertisement.findAll({
    where:{banner_position_id},
    // include:{model:BannerPosition}
  });
  if (GetData[0] == 0) throw new BadRequestError("Please try again later");
  return GetData;
};


const doGetAdvertisementsubscription= async ({ BadRequestError,Advertisement,BannerPosition}) => {
  const GetData = await Advertisementsubscription.findAll({  
    include:  { model: Advertisement ,include:{model:BannerPosition} },
    order: [["createdAt", "DESC"]],
  });
  if (GetData[0] == 0) throw new BadRequestError("Please try again later");
  return GetData;
};




const doUpdateAdvertisementPackage= async ({
  id,

  BadRequestError,
  BuilderUpdateData,
}) => {
  const agent = await Advertisement.findOne({
    where: {
      banner_position_id: BuilderUpdateData.banner_position_id,
      page: BuilderUpdateData.page,
      duration: BuilderUpdateData.duration,
      banner_size: BuilderUpdateData.banner_size,
      id: { [Op.ne]: id }
    },
  });
  console.log("🚀 ~ file: advertisementpackage.service.js:71 ~ agent:", agent)
  if (agent) {
    throw new BadRequestError(' This Advertisement Package  Allredy exists');
  }
  const data = await Advertisement.update(BuilderUpdateData,{
    where: {
      id:id 
    },
  });
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  }





// Search Builder
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Delete Builder
const doDeleteAdvertisementsubscription = async ({ id, BadRequestError }) => {
  const data = await Advertisementsubscription.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


// Update Builder Status
const doUpdateAdvertisementsubscriptionStatus = async ({
  id,
  Advertisement,
  BadRequestError,
  status,
}) => {
  console.log(id);
  const data = await Advertisementsubscription.update({ status }, { where: { id: id } });
  if (data[0] == 0) throw new BadRequestError("Please try again later");
  return data[0];
};


const doCheckAdvertisementPackageLocation = async ({
  banner_position_id,
  page,
  duration,
  banner_size,
  Advertisement

}) => {
  const userby = await Advertisement.findOne({
    where: {
      banner_position_id,
      page,
      duration,
      banner_size,
    },
  });
  if (!userby) throw new NotFoundError('Advertisement not found!');
  console.log(userby);
  return userby;

};

const doSearchAdvertisementsubscription = async ({
  BadRequestError,
  startDate,
  endDate,
  page,
  duration,
  Advertisement,
  BannerPosition
}) => {
let newobject = {};
if(page){
  newobject.page=page
}
if(duration){
  newobject.duration= duration 

}

const moment = require('moment');
const now = moment();
if (startDate) {
  newobject.createdAt = {
    [Op.between]: [
      moment(startDate).startOf('day'),
      moment(endDate).endOf('day'),
    ],
  }
}
// const moment = require('moment');
// const now = moment();
// if (start_date) {
//    const startDate = moment(start_date).startOf('day').toDate();
//    newobject.start_date = {startDate };
// }
// if (end_date) {
//   const startDate = moment(end_date).endOf('day').toDate();
//   newobject.end_date = {[Op.lte]: startDate,
//  };
// }
  const data = await Advertisementsubscription.findAll({
    where:  newobject, 
    include:  { model: Advertisement ,include:{model:BannerPosition} },
    order: [["createdAt", "DESC"]],

  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};










module.exports = {
  doAdvertisementsubscription,
  doGetAdvertisementPackage,
  doGetBannerPositionByPage,
  doGetAdvertisementsubscription,
  doUpdateAdvertisementPackage,
  doCheckAdvertisementPackageLocation,
  doDeleteAdvertisementsubscription,
  doUpdateAdvertisementsubscriptionStatus,
  doSearchAdvertisementsubscription,
  doGetDurationByBannerPosition
};
