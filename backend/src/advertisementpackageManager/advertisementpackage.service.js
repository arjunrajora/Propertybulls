const { BannerPosition,Advertisement, sequelize} = require("../db");
const { NotFoundError, BadRequestError } = require("../utils/api-errors");
// AdvertisementPackage Add
const doAdvertisementPackage = async ({
  page,
  banner_position_id,
  duration,
  discount_price,
  amount,
  banner_size
}) => {
  const AdvertisementPackage = await Advertisement.create({
    page,
    banner_position_id,
    duration,
    discount_price,
    amount,
    banner_size
  });
  return {
    builderId: AdvertisementPackage.id};
};

// View BannerPosition
const doGetBannerPosition= async ({ BadRequestError,BannerPosition}) => {
  const GetData = await BannerPosition.findAll({

    order: [["createdAt", "DESC"]],

  });
  if (GetData[0] == 0) throw new BadRequestError("Please try again later");
  return GetData;
};
const doGetBannerPositionByPage= async ({ BadRequestError,BannerPosition,page}) => {
  const GetData = await BannerPosition.findAll({
    where:{page:page}
  });
  if (GetData[0] == 0) throw new BadRequestError("Please try again later");
  return GetData;
};

const doGetAdvertisementPackage= async ({ BadRequestError,BannerPosition}) => {
  const GetData = await Advertisement.findAll({
    include:  { model: BannerPosition },
  
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
const doDeleteAdvertisementPackage = async ({ id, BadRequestError }) => {
  const data = await Advertisement.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


// Update Builder Status
const doUpdateAdvertisementPackageStatus = async ({
  id,
  Advertisement,
  BadRequestError,
  status,
}) => {
  console.log(id);
  const data = await Advertisement.update({ status }, { where: { id: id } });
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
  if (!userby) throw new NotFoundError('Agent not found!');
  console.log(userby);
  return userby;

};












module.exports = {
  doAdvertisementPackage,
  doGetBannerPosition,
  doGetBannerPositionByPage,
  doGetAdvertisementPackage,
  doUpdateAdvertisementPackage,
  doCheckAdvertisementPackageLocation,
  doDeleteAdvertisementPackage,
  doUpdateAdvertisementPackageStatus,
  
};
