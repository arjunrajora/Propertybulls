
const {
  Property,
  Propertyfeature,
  propertyImage,
  propertydetails,
  propertyTypes,
  sequelize,
  Features

} = require('../../db');

const { generateJWT, verifyJWT } = require('../../utils/jwt');

const { NotFoundError, BadRequestError } = require('../../utils/api-errors');

//View Propertydetail
const Sequelize = require("sequelize");
const { includes } = require('lodash');
const Op = Sequelize.Op;
const doGetPropertydetail = async ({
  BadRequestError,
  Property,
  url,
  p_typeid,
  type,
  propertyTypes,

}) => {
  let newobject = {};
  if (url) {
    newobject.url = { [Op.like]: `%${url}%` }
  }
  else if (p_typeid) {
    newobject.p_typeid = p_typeid
  }
  else if (type) {
    newobject.type = type
  }
  const propertydetail = await Property.findAll({
    where: newobject,
    include: [{ model: propertyTypes }],


  });
  if (propertydetail[0] == 0) throw new BadRequestError('Please try again later');
  return propertydetail;
};

const doview = async ({
  BadRequestError,
  Property,
  Location,
  User
}) => {
  const propertydetail = await Property.findAll({

    include: { model: Location },
    include: { model: User }
  });
  if (propertydetail[0] == 0) throw new BadRequestError('Please try again later');
  return propertydetail;
};


const dogetPropertydetail = async ({
  url,
  Property
}) => {
  const data = await Property.findAll({
    where: {
      url,
    },
  });
  if (data === 0) throw new BadRequestError('Id Not Match');
  return data;
};



const doGetPropertydetailById = async ({
  url,
  Property,
  propertyTypes,
  propertyImage,
  propertydetails,
  Propertyfeature,
  User,
  Role
}) => {
  const data = await Property.findOne({
    where: { url },

    include: [
      {
        model: User,
        include: [{
          model: Role,
        }],
      },
      {
        model: propertyImage,
      },
      {
        model: propertydetails,
      },
      {
        model: propertyTypes,
      },
      {
        model: Propertyfeature,
        include: [{
          model: Features,
        }],
      },

    ]
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data;
};

const docheckpro_id = async ({
  pro_id,
  Propertyfeature
}) => {
  console.log(pro_id, "hello");
  const data = await Propertyfeature.findOne({
    where: { pro_id }
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data;
};


// prpertytype
//get data Propertytypes 
const dogetPropertyType = async ({


}) => {
  const propertytypes = await propertyTypes.findAll();
  return propertytypes
};







module.exports = {

  doGetPropertydetail,
  doview,
  doGetPropertydetailById,
  dogetPropertydetail,
  docheckpro_id,
  dogetPropertyType
};
