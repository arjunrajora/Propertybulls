
const { url } = require('inspector');
const { property, sequelize, GALLERY, propertydetails, Location, Propertyfeature, propertyTypes, propertyImage } = require('../../db');


const { NotFoundError, BadRequestError } = require('../../utils/api-errors');
// Property Add

const doProperty = async ({
  name,
  ship,
  address,
  address2,
  room,
  option,
  p_unit,
  description,
  tot_price,
  faceid,
  pincode,
  location_id,
  city_id,
  state_id,
  area,
  flooring,
  p_floor,
  bath,
  floor,
  age,
  type,
  p_typeid,
  featureimage,
  cus_id

}) => {
  const combinedString = name + "-" + address;

  const viewAllproperty = await property.create(
    {
      name,
      ship,
      address,
      address2,
      room,
      option,
      p_unit,
      description,
      tot_price,
      faceid,
      pincode,
      location_id,
      city_id,
      state_id,
      area,
      flooring,
      p_floor,
      bath,
      floor,
      age,
      type,
      p_typeid,
      featureimage,
      cus_id,

      url: combinedString,
    },

  );
  console.log("viewAllproperty", viewAllproperty)
  return viewAllproperty

};
const doPropertyfeatures = async ({
  pro_id,
  check_list
}) => {
  var arrcheck_list = check_list.split(",");
  for (const checkdata of arrcheck_list) {
    await Propertyfeature.create({
      pro_id: pro_id,
      check_list: checkdata
    });
  }

  return true;
};

const doPropertyImg = async ({ filename, pro_id,
  type, }) => {

  const insertedDetails = [];

  for (const filenames of filename) {
    const detail = await propertyImage.create({
      img: filenames,
      pro_id,
      type: 1,
    });
    insertedDetails.push(detail);
    console.log("hyyyyy kamal", detail)
  }
  return insertedDetails;
};

const doPropertyFloorImg = async ({ filename, pro_id,
  type, }) => {
  const insertedDetails = [];

  for (const floorimges of filename) {
    const detail = await propertyImage.create({
      img: floorimges,
      pro_id,
      type: 2,
    });
    insertedDetails.push(detail);
  }

  return insertedDetails;
};





//get data Propertytypes 

const doGetProperty = async ({
  BadRequestError,
  // propertyperealtions,
  property,
  State,
  City,
  Location,
  // GALLERY,
  propertyTypes,
  Facing,
  User,
  Role
}) => {
  const city = await property.findAll({

    where: { type: 0 },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: State,
      },
      {
        model: City,
      },
      {
        model: Location,
      },
      {
        model: propertyTypes,
      },
      {
        model: Facing,
      },
      {
        model: User,
        include: [{
          model: Role,
        }]
      },
    ],


  });
  if (city[0] == 0) throw new BadRequestError('Please try again later');
  return city;
};


//update data in property
// Edit property
const doUpdateProperty = async ({
  id,
  property,
  BadRequestError,
  UpdateData,
  featureimageFilename

}) => {
  let featureimage = featureimageFilename
  const { state_id,
    rera_registration,
    build_id,
    cus_id,
    carpet,
    build,
    b_unit,
    vid_url,
    t_type,
    area_in_sqft,
    name,
    ship,
    address,
    address2,
    room,
    option,
    p_unt,
    description,
    tot_price,
    faceid,
    pincode,
    location_id,
    city_id,
    area,
    flooring,
    p_floor,
    bath,
    floor,
    remark,
    a_unit,
    p_unit,
    p_typeid,
    deposit } = UpdateData;
  console.log("hhhhhhhhhhhh", UpdateData)
  const data = await property.update({
    state_id,
    rera_registration,
    build_id,
    cus_id,
    carpet,
    build,
    b_unit,
    vid_url,
    t_type,
    area_in_sqft,
    name,
    ship,
    address,
    address2,
    room,
    option,
    p_unt,
    description,
    tot_price,
    faceid,
    pincode,
    location_id,
    city_id,
    area,
    flooring,
    p_floor,
    bath,
    floor,
    remark,
    a_unit,
    p_unit,
    p_typeid,
    deposit, featureimage
  },
    {
      where: {
        id: id,
      },
    }
  );
  // if (data === 0) { throw new BadRequestError('Id Not Match'); }
  return data;
};

const doUpdatePropertyImg = async ({ filename, pro_id, floorimges,
  type, }) => {
  const insertedDetails = [];

  if (floorimges && floorimges.length > 0) {
    const project = await propertyImage.destroy({
      where: {
        pro_id, type: 2
      },
    });
    for (const floorImage of floorimges) {
      const detail = await propertyImage.create({
        img: floorImage,
        pro_id,
        type: 2,
      });
      insertedDetails.push(detail);
    }
  }
  if (filename && filename.length > 0) {
    const project = await propertyImage.destroy({
      where: {
        pro_id, type: 1
      },
    });
    for (const filenames of filename) {
      const detail = await propertyImage.create({
        img: filenames,
        pro_id,
        type: 1,
      });
      console.log("service", filenames)
      insertedDetails.push(detail);
    }
  }



  return insertedDetails;
};
const doUpdatePropertyfeatures = async ({
  pro_id,
  check_list
}) => {


  const users = await Propertyfeature.destroy({
    where: {
      pro_id: pro_id,
    },
  });


  var arrcheck_list = check_list.split(",");
  for (const checkdata of arrcheck_list) {
    await Propertyfeature.create({
      pro_id: pro_id,
      check_list: checkdata
    });
  }
  return true;
};








//status data in types
const doStatus = async ({
  id,
  BadRequestError,
  status
}) => {
  const data = await property.update({ status },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};






const doDeleteProperty = async ({
  // Delete Agent
  id,
  BadRequestError,
}) => {
  const data = await property.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};


// property searching
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchProperty = async ({
  tot_price,
  option,
  p_typeid,
  location_id,
  city_id,
  state_id,
  property,
  status,
  featured,
  BadRequestError,
  cus_id,
  id,
  State,
  City,
  Location,
  User,
  Role,
  propertyTypes,
  Facing
}) => {
  let newobject = {};
  if (option) {
    newobject.option = { [Op.like]: `%${option}%` }
  }
  else if (p_typeid) {
    newobject.p_typeid = p_typeid
  }
  else if (location_id) {
    newobject.location_id = location_id
  }
  else if (city_id) {
    newobject.city_id = city_id
  }
  else if (state_id) {
    newobject.state_id = state_id
  }
  else if (featured) {
    newobject.featured = featured
  }
  else if (status) {
    newobject.status = status
  }
  else if (cus_id) {
    newobject.cus_id = cus_id
  }
  else if (id) {
    newobject.id = id
  }
  else if (tot_price) {
    newobject.tot_price = { [Op.like]: `%${tot_price}%` }
  }

  console.log("newobject", newobject);
  const data = await property.findAll({
    where: newobject,
    include: [
      {
        model: State,
      },
      {
        model: City,
      },
      {
        model: Location,
      },
      {
        model: propertyTypes,
      },
      {
        model: Facing,
      },
      {
        model: User,
        include: [{
          model: Role,
        }]
      },
    ],

    order: [["name", "ASC"]],
  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};


//view property img get by id 
const doGetPropertyimg = async ({
  // Delete Agent
  pro_id,
  BadRequestError,
  GALLERY,

}) => {
  const data = await GALLERY.findAll({
    where: {
      pro_id
    },
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data
};





//get data Propertytypes 
const doGetPropertyType = async ({


}) => {
  const propertytypes = await propertyTypes.findAll(
    { where: { status: "Y" } }
  );
  return propertytypes
};



// Property detailby id description & Remark 
const doGetPropertybyid = async ({ BadRequestError, propertyImage, Propertyfeature,

  id
}) => {
  const detail = await property.findOne(
    {
      include: [{ model: Propertyfeature },
      { model: propertyImage },
      ],
      where: { id: id },
    }
  );
  return detail
};


// Update property description & remark
const doUpdateDescription = async ({ id, BadRequestError, PropertyUpdateData }) => {
  const data = await property.update(PropertyUpdateData, {
    where: {
      id: id,
    },
  });
  if (data[0] == 0) throw new BadRequestError("id not match");
  return data;
};


// Property Featured & unfeatured
const doUpdateFeatured = async ({
  id,
  BadRequestError,
  featured
}) => {
  const data = await property.update({ featured },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};





module.exports = {
  doProperty,
  doGetProperty,
  doUpdateProperty,
  doStatus,
  doDeleteProperty,
  // doPropertyDetail,
  doPropertyImg,
  doGetPropertyimg,
  doPropertyfeatures,
  doSearchProperty,
  doGetPropertyType,
  doGetPropertybyid,
  doUpdateProperty,
  doUpdatePropertyImg,
  doUpdatePropertyfeatures,
  doPropertyFloorImg,
  doUpdateDescription,
  doUpdateFeatured
};

