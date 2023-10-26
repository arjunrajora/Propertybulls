// Add Agent
const addAgent = ({
  BadRequestError,
  doCheckUserExist,
  doAgent,
  validateAgentCreateData
}) => async (httpRequest) => {
  console.log('@@@',httpRequest);
  const {
    name,
    lname,
    username,
    companyname,
    mobile,
    loc_ids,
    state_id,
    city_id,
    role_id
  } = httpRequest.body;  
  const { error } = validateAgentCreateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  try {
    await doCheckUserExist({
      username,
    });
  } catch (err) {
    const data = await doAgent({
      name,
      lname,
      username,
      companyname,
      mobile,
      loc_ids,
      state_id,
      city_id,
      role_id,
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Agent added successfully!',
        data,
      },
    };
};
throw new BadRequestError('Agent already exist!');
};

// View Agent
const getAgent = ({
  BadRequestError,
  doGetAgent,
  Agent,
 property,Requirement,
  
  Location
}) => async (httpRequest) => {
    const data = await doGetAgent({
      Agent,
      BadRequestError,
      Location,
      property,
      Requirement
    });
    
//  console.log(data,">>");
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Agents details successfully!',
      data,
    },
  
  };
};

// Update Agent
const updateAgent = ({
  doUpdateAgent,
  Agent,
  BadRequestError,
  doCheckUserExist,
  validateAgentUpdateData
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  AgentUpdateData  = httpRequest.body;
  console.log(AgentUpdateData.username,"deerd");
  const { error } = validateAgentUpdateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateAgent({
    id,
    Agent,
    BadRequestError,
    AgentUpdateData
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Agent updated successfully!',
      data,
    },
  };
};


//status
//status data
const status = ({
  doStatus,
  Agent,
  BadRequestError,
  validateAgentStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = httpRequest.body;
  status=(status==="Y")?"N":"Y"
  const {
    error,
  } = validateAgentStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doStatus({
    id,
    Agent,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Status updated successfully!',
      data,
    },
  };
};

// Delete Agent
const deleteAgent = ({ 
  doDeleteAgent,
  BadRequestError
  ,doCheckPropertyByagent}) => async (
  httpRequest,
) => {
  const { id } = httpRequest.params;
  try{
 await doCheckPropertyByagent({
  cus_id:id,
BadRequestError,
  });

}catch(err){
  const data = await doDeleteAgent({
    id,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Agent deleted successfully!',
      data,
    },
  };
};
throw new BadRequestError('Agent delete not found !');
}


// const deleteAgent = ({ 
//   doDeleteAgent,
//   BadRequestError,property
//   ,doCheckPropertyByagent}) => async (
//   httpRequest,
// ) => {
//   const { id } = httpRequest.params;
//   console.log("id",id);
//   const users= await doCheckPropertyByagent({
//     cus_id:id,
//     BadRequestError,
//   });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Agent deleted successfully!',
//       users,
//     },
//   };
// };


// View By Id
const getAgentById = ({
  doGetAgentById,
  Agent
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetAgentById({
    id,
    Agent
  });
  console.log("data==>>",data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Agent successfully!',
      data
    },
  };
};

const searchAgent = ({
  doSearchAgent,
  Agent,
  Location,
  property,
  BadRequestError,
}) => async (httpRequest) => {
  const {  name,
    mobile,
    loc_ids,
    state_id,
    city_id, status} = httpRequest.body;
  console.log("BODY DATA=>>>",httpRequest.body); 
  const data = await doSearchAgent({
    name,
    mobile,
    loc_ids,
    state_id,
    city_id,
    status,
    Agent,
    Location,
    property,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Agent Search successfully!',
      data,
    },
  };
};











// View By Id
const getProperty = ({
  doGetProperty,
  Agent,
  property,
  Location,
  propertyTypes,
  Facing,
  Responses
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetProperty({
    id,
    Agent,
    property,
    Location,
    propertyTypes,
    Facing,
    Responses
  });
  console.log("data==>>",data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Property successfully!',
      data,
    },
  };
};

module.exports = {
  addAgent,
  getAgent,
  updateAgent,
  deleteAgent,
  getAgentById,
  status,
  searchAgent,
  getProperty
};
