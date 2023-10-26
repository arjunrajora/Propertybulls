
const {
  Agent,
  property,
  Responses,
  Email,
  sequelize,
} = require('../db');
const { generateJWT, verifyJWT } = require('../utils/jwt');
const { NotFoundError, BadRequestError } = require('../utils/api-errors');
const {AgentRegisteredTemplate } = require("../utils/email-templates");
const emailTransporter = require('../utils/email');
// Agent Add
const doAgent = async ({
      name,
      lname,
      username,
      companyname,
      mobile,
      loc_ids,
      state_id,
      city_id,
       role_id,
}) => {
    const agent = await Agent.create(
      {
        name,
        lname,
        username,
        companyname,
        mobile,
        loc_ids,
        state_id,
        city_id,
       role_id,
      },
    );
    const emailtempleate = await Email.findOne({
      where: {
        id:24
      },
    });
    template = AgentRegisteredTemplate({
      fromUser: "Property bull",
      fromEmail: "contact@propertybull.com",
      toEmail: username,
      Name:name,
      mobile: mobile, 
      username: username, 
      html:emailtempleate.dataValues.description,
      subject:emailtempleate.dataValues.subject,
      role:'builder'
    });
  const result = await emailTransporter.send(template);
    return {
      agentId: agent.id
    };
  //});
};


const doCheckUserExist = async ({ username }) => {
  username = username.toLowerCase();
  const agent = await Agent.findOne({
    where: {
      username: username
    },
  });
  //console.log(user);
  if (!agent) throw new NotFoundError('Agent not found!');
  return agent;
};

// View Agent
const doGetAgent = async ({
  BadRequestError,
  Agent,
  Location,
  Requirement
}) => {
  const agent = await Agent.findAll({
    where:{
      role_id:"3"
    },
    order: [["createdAt", "DESC"]],

    include: [
{model: property},
{model: Location},
{ model: Requirement },

    ],

  });
  if (agent[0] == 0) throw new BadRequestError('Please try again later');
  return agent
}; 
// Update Agent
const doUpdateAgent = async ({
  id,
  Agent,
  BadRequestError,
  AgentUpdateData,
  username,
}) => {

  const agent = await Agent.findOne({
    where: {
      username:AgentUpdateData.username,
      id:{[Op.ne]:id}
    },
  });
if(agent){
 throw new BadRequestError(' This Username  Allredy exists');
}
  const data = await Agent.update(  AgentUpdateData,
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};


// const doUpdateAgent = async ({
//   id,
//   Agent,
//   BadRequestError,
//   AgentUpdateData
// }) => {
//   const data = await Agent.update(  AgentUpdateData,
//     {
//       where: {
//         id: id,
//       },
//     },
//   );
//   if (data[0] == 0) throw new BadRequestError('Id Not Match');
//   return data[0];
// };
const doStatus = async ({
  id,
  Agent,
  BadRequestError,
  status
}) => {
  const data = await Agent.update(  {status},
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Id Not Match');
  return data
};





// Delete Agent
const doDeleteAgent = async ({
  id,
  BadRequestError,
}) => {
  const data = await Agent.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};

// Agent View By Id
const doGetAgentById = async ({
  id,
}) => {
  const agents = await Agent.findOne({
    where: {
     id,
    },
  });
  if (agents==0) throw new BadRequestError('Id Not Match');
  return agents;
};

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchAgent = async ({
  name,
  mobile,
  loc_ids,
  state_id,
  city_id,
  Agent,
  status,
  BadRequestError,
  Location,
  property
}) => {
let newobject = {};
if(name){
  newobject.name= { [Op.like]: `%${name}%` }
}
if(mobile){
  newobject.mobile= { [Op.like]: `%${mobile}%` }

}
if(loc_ids){
  newobject.loc_ids=loc_ids
}
if(state_id){
  newobject.state_id=state_id
}
if(city_id){
  newobject.city_id=city_id
}
if(status){
  newobject.status=status
}
newobject.role_id = 3;
console.log("newobject",newobject);
  const data = await Agent.findAll({
    where:  newobject, 
  
    include: [
      {model: Location},
      {model: property},
          ],
    order: [["name", "ASC"]],

  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};





//Prpertydetail in agent
const doGetProperty = async ({
  id,
  property,
  Location,
  propertyTypes,
  Facing,
  Responses
}) => {
  const data = await Agent.findOne({
    include: [
      {
      model: property,

      include: [
        { model: Responses},
        { model: Location},
       { model: propertyTypes},
       { model: Facing},
],

      }],
    where: {
     id,
    },
  });
  if (data == 0) throw new BadRequestError('Id Not Match');
  return data
};


const doCheckPropertyByagent = async ({
  cus_id,


}) => {
  const agent = await property.findOne({
    where: {
      cus_id
    },
  });
  if (!agent) throw new NotFoundError('Agent not found!');
  return agent;
};

module.exports = {
  doAgent,
  doCheckUserExist,
  doGetAgent,
  doUpdateAgent,
  doDeleteAgent,
  doGetAgentById,
  doSearchAgent,
  doStatus,
  doGetProperty,
  doCheckPropertyByagent
};

