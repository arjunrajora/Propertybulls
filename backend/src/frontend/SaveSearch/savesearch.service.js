const { Saveserch, sequelize,Email,User,Location,propertyTypes} = require("../../db");
const { generateJWT, verifyJWT } = require("../../utils/jwt");
const { NotFoundError, BadRequestError } = require("../../utils/api-errors");
const {saveSearchTemplate } = require("../../utils/email-templates");
const emailTransporter = require('../../utils/email');
// Builder Add
const doSave = async ({
  title,
  property_name,
  category,
  p_typeid,
  state_id,
  min_price,
  max_price,
  description,
  city_id,
  min_area,
  max_area,
  unit,
  min_room,
  max_room,
  min_floor,
  max_floor,
  cus_id,
  room,
  location_id,
  age,
}) => {
  const save = await Saveserch.create({
    title,
    property_name,
    category,
    p_typeid,
    state_id,
    min_price,
    max_price,
    description,
    city_id,
    min_area,
    max_area,
    unit,
    min_room,
    max_room,
    min_floor,
    max_floor,
    cus_id,
    room,
    location_id,
    age,
  });
  const emailtempleate = await Email.findOne({
    where: {
      id:71
    },
  });
  const users = await User.findOne({
    where: {
      id:cus_id
    },
  });
  const locationes = await Location.findOne({
    where: {
      id:location_id
    },
  });
  const propertytypesname = await propertyTypes.findOne({
    where: {
      id:p_typeid, 
    },
  });
  template = saveSearchTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: users.dataValues.username,
    name:users.dataValues.name,
    category:category,
    P_Typeid:propertytypesname?propertytypesname.dataValues.name:"",
    Tot_price:min_price,
    Area:min_area,
     Room:room,
     Age:age,
     Locality:locationes.dataValues.name,
     html:emailtempleate.dataValues.description,
     subject:emailtempleate.dataValues.subject,
    });
const result = await emailTransporter.send(template);

  return save;
};

// // View Builder
// const doGetBuilder = async ({ BadRequestError, Builder, Location, State, role_id, property }) => {
//   const builder = await Builder.findAll({
//     where: {
//       role_id: "4"
//     },
//     order: [["createdAt", "DESC"]],


//     include: [
//       { model: State },
//       { model: property },
//       { model: Location },

//     ],

//   });
//   if (builder[0] == 0) throw new BadRequestError("Please try again later");
//   return builder;
// };

// // Update Builder
// const doUpdateBuilder = async ({
//   id,
//   Builder,
//   BadRequestError,
//   BuilderUpdateData,
//   filename
// }) => {
//   const agent = await Builder.findOne({
//     where: {
//       username: BuilderUpdateData.username,
//       id: { [Op.ne]: id }
//     },
//   });
//   if (agent) {
//     throw new BadRequestError(' This Username  Allredy exists');
//   }
//   var image = filename;
//   const { name,
//     lname,
//     username,
//     password,
//     cpass,
//     mobile,
//     occu,
//     description,
//     loc_ids,
//     altemail,
//   } = BuilderUpdateData;

//   if (image !== null) {
//     const data = await Builder.update({
//       image, name, lname, username,
//       password, cpass, mobile, occu, description, loc_ids, altemail
//     }, {
//       where: {
//         id: id,
//       },

//     });
//     if (data[0] == 0) throw new BadRequestError("Id Not Match");
//     return data[0];
//   } else {
//     const data = await Builder.update({
//       name, lname, username,
//       password, cpass, mobile, occu, description, loc_ids, altemail
//     }, {
//       where: {
//         id: id,
//       },
//     });
//     if (data[0] == 0) throw new BadRequestError("Id Not Match");
//     return data[0];
//   }

// }



// // Search Builder
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
// const doSearchBuilder = async ({
//   name,
//   mobile,
//   startDate,
//   endDate,
//   loc_ids,
//   state_id,
//   Builder,
//   Location, property,
//   status, featured,
//   BadRequestError,
// }) => {
//   let newobject = {};
//   if (name) {
//     newobject.name = { [Op.like]: `%${name}%` }
//   }
//   if (mobile) {
//     newobject.mobile = { [Op.like]: `%${mobile}%` }

//   }
//   if (loc_ids) {
//     newobject.loc_ids = loc_ids
//   }
//   if (state_id) {
//     newobject.state_id = state_id
//   }
//   if (status) {
//     newobject.status = status
//   }
//   if (featured) {
//     newobject.featured = featured
//   }
//   newobject.role_id = 4;

//   const moment = require('moment');
//   const now = moment();
//   if (startDate) {
//     newobject.createdAt = {
//       [Op.between]: [
//         moment(startDate).startOf('day'),
//         moment(endDate).endOf('day'),
//       ],
//     }
//   }
//   console.log("newobject", newobject);
//   const data = await Builder.findAll({
//     where: newobject,

//     include: [
//       { model: Location },
//       { model: property },
//     ],
//     order: [["name", "ASC"]],

//   });
//   if (data[0] == 0) throw new BadRequestError("Data Not Match");
//   return data;
// };

// // Delete Builder
const doDeleteSaveSearch = async ({ id, BadRequestError }) => {
  const data = await Saveserch.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

// Builder View By Id
const doGetsavesearchById = async ({ cus_id }) => {
  const data = await Saveserch.findAll({
    where: {
      cus_id,
    },
  });
    if (!data) throw new BadRequestError('Id Not Match');
  return data
};

// Update Builder Status
// const doUpdateBuilderStatus = async ({
//   id,
//   Builder,
//   BadRequestError,
//   status,
// }) => {
//   console.log(id);
//   const data = await Builder.update({ status }, { where: { id: id } });
//   if (data[0] == 0) throw new BadRequestError("Please try again later");
//   return data[0];
// };

// // Update Featured
// const doUpdateFeatured = async ({
//   id,
//   Builder,
//   BadRequestError,
//   featured
// }) => {
//   const data = await Builder.update({ featured },
//     {
//       where: {
//         id: id,
//       },
//     },
//   );
//   if (data[0] == 0) throw new BadRequestError('Id Not Match');
//   return data[0];
// };




// //Projectdetail in builder
// const doGetProject = async ({
//   id,
//   property,
//   Location,
//   propertyTypes,
//   Facing,
//   Responses
// }) => {
//   const data = await Builder.findOne({
//     include: [
//       {
//         model: property,

//         include: [
//           { model: Responses },
//           { model: Location },
//           { model: propertyTypes },
//           { model: Facing },
//         ],

//       }],
//     where: {
//       id,
//     },
//   });
//   if (data == 0) throw new BadRequestError('Id Not Match');
//   return data
// };
// const doCheckProjectbyBuilder = async ({
//   cus_id,


// }) => {
//   const userby = await property.findOne({
//     where: {
//       cus_id
//     },
//   });
//   if (!userby) throw new NotFoundError('Agent not found!');
//   console.log(userby);
//   return userby;

// };












module.exports = {
  doSave,
  doGetsavesearchById,
  doDeleteSaveSearch

};
