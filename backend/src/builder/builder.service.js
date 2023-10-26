const { Builder, sequelize, property,Email } = require("../db");
const { generateJWT, verifyJWT } = require("../utils/jwt");
const { NotFoundError, BadRequestError } = require("../utils/api-errors");
const {BuilderRegisteredTemplate } = require("../utils/email-templates");
const emailTransporter = require('../utils/email');

// Builder Add
const doBuilder = async ({
  name,
  lname,
  username,
  password,
  cpass,
  mobile,
  occu,
  description,
  loc_ids,
  filename,
  role_id,
}) => {
  var image = filename;
  const builder = await Builder.create({
    name,
    lname,
    username,
    password,
    cpass,
    mobile,
    occu,
    description,
    loc_ids,
    image,
    role_id,
  });
  const emailtempleate = await Email.findOne({
    where: {
      id:25
    },
  });
  template = BuilderRegisteredTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: username,
    Name:name,
    password: password, 
    mobile: mobile, 
    username: username, 
    html:emailtempleate.dataValues.description,
    subject:emailtempleate.dataValues.subject,
    role:'Builder'
  });
const result = await emailTransporter.send(template);
  return {
    builderId: builder.id,
    result
  };
};
const doCheckUserExist = async ({ username }) => {
  username = username.toLowerCase();
  const builder = await Builder.findOne({
    where: {
      username: username,
    },
  });
  if (!builder) throw new NotFoundError("Builder not found!");
  return builder;
};

// View Builder
const doGetBuilder = async ({ BadRequestError, Builder, Location, State, role_id, property }) => {
  const builder = await Builder.findAll({
    where: {
      role_id: "4"
    },
    order: [["createdAt", "DESC"]],


    include: [
      { model: State },
      { model: property },
      { model: Location },

    ],

  });
  if (builder[0] == 0) throw new BadRequestError("Please try again later");
  return builder;
};

// Update Builder
const doUpdateBuilder = async ({
  id,
  Builder,
  BadRequestError,
  BuilderUpdateData,
  filename
}) => {
  const agent = await Builder.findOne({
    where: {
      username: BuilderUpdateData.username,
      id: { [Op.ne]: id }
    },
  });
  if (agent) {
    throw new BadRequestError(' This Username  Allredy exists');
  }
  var image = filename;
  const { name,
    lname,
    username,
    password,
    cpass,
    mobile,
    occu,
    description,
    loc_ids,
    altemail,
  } = BuilderUpdateData;

  if (image !== null) {
    const data = await Builder.update({
      image, name, lname, username,
      password, cpass, mobile, occu, description, loc_ids, altemail
    }, {
      where: {
        id: id,
      },

    });
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  } else {
    const data = await Builder.update({
      name, lname, username,
      password, cpass, mobile, occu, description, loc_ids, altemail
    }, {
      where: {
        id: id,
      },
    });
    if (data[0] == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  }

}



// Search Builder
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchBuilder = async ({
  name,
  mobile,
  startDate,
  endDate,
  loc_ids,
  state_id,
  Builder,
  Location, property,
  status, featured,
  BadRequestError,
}) => {
  let newobject = {};
  if (name) {
    newobject.name = { [Op.like]: `%${name}%` }
  }
  if (mobile) {
    newobject.mobile = { [Op.like]: `%${mobile}%` }

  }
  if (loc_ids) {
    newobject.loc_ids = loc_ids
  }
  if (state_id) {
    newobject.state_id = state_id
  }
  if (status) {
    newobject.status = status
  }
  if (featured) {
    newobject.featured = featured
  }
  newobject.role_id = 4;

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
  console.log("newobject", newobject);
  const data = await Builder.findAll({
    where: newobject,

    include: [
      { model: Location },
      { model: property },
    ],
    order: [["name", "ASC"]],

  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};

// Delete Builder
const doDeleteBuilder = async ({ id, BadRequestError }) => {
  const data = await Builder.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

// Builder View By Id
const doGetBuilderById = async ({ id }) => {
  const data = await Builder.findOne({
    where: {
      id,
    },
  });
  return data;
};

// Update Builder Status
const doUpdateBuilderStatus = async ({
  id,
  Builder,
  BadRequestError,
  status,
}) => {
  console.log(id);
  const data = await Builder.update({ status }, { where: { id: id } });
  if (data[0] == 0) throw new BadRequestError("Please try again later");
  return data[0];
};

// Update Featured
const doUpdateFeatured = async ({
  id,
  Builder,
  BadRequestError,
  featured
}) => {
  const data = await Builder.update({ featured },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};




//Projectdetail in builder
const doGetProject = async ({
  id,
  property,
  Location,
  propertyTypes,
  Facing,
  Responses
}) => {
  const data = await Builder.findOne({
    include: [
      {
        model: property,

        include: [
          { model: Responses },
          { model: Location },
          { model: propertyTypes },
          { model: Facing },
        ],

      }],
    where: {
      id,
    },
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data
};
const doCheckProjectbyBuilder = async ({
  cus_id,


}) => {
  const userby = await property.findOne({
    where: {
      cus_id
    },
  });
  if (!userby) throw new NotFoundError('Agent not found!');
  console.log(userby);
  return userby;

};












module.exports = {
  doBuilder,
  doCheckUserExist,
  doGetBuilder,
  doUpdateBuilder,
  doSearchBuilder,
  doDeleteBuilder,
  doGetBuilderById,
  doUpdateBuilderStatus,
  doUpdateFeatured, doGetProject,
  doCheckProjectbyBuilder
};
