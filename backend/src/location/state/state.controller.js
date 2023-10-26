//Add State
const stateAdd = ({
  BadRequestError,
  doStateAdd,
  validateAddState
}) => async (httpRequest) => {
  const {
    name
  } = httpRequest.body;
  const {
    error,
  } = validateAddState(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
    const faqResult = await doStateAdd({
     name
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'state added successfully!',
        data: faqResult,
      },
    };
};
//Get Data in State
const getState = ({
  BadRequestError,
  doGetState,
  State
}) => async (httpRequest) => {
  
  const data = await doGetState({
    BadRequestError,
    State
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched State successfully!',
      data,
    },
  };
};
// Update State
const UpdateState = ({
  doUpdateState,
  State,
  BadRequestError,
  validateUpdateState
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  BuilderUpdateData  = httpRequest.body;
  const { error } = validateUpdateState(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateState({
    id,
    State,
    BadRequestError,
    BuilderUpdateData
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'State updated successfully!',
      data,
    },
  };
};



const statusState = ({
  doStatusState,
  State,
  BadRequestError,
  validateStatusState
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = httpRequest.body;
  status=(status==="Y")?"N":"Y"
  const { error } = validateStatusState(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doStatusState({
    id,
    State,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'State updated successfully!',
      data,
    },
  };
};
//  //Edit State

  const EditState = ({
    doEditState,
    State
  }) => async (httpRequest) => {
    const { id } = httpRequest.params;
    const data = await doEditState({
      id,
      State
    });
    console.log("data==>>",data);
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'fetched state successfully!',
        data,
      },
    };
  };


// //Delete State 

const DeleteState = ({
  BadRequestError,
  doDeleteState
  
}) => async (httpRequest) => {
  const {
    id,
  } = httpRequest.params;
 
  const data = await doDeleteState({
    id,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted state successfully!',
      data,
    },
  };
};


module.exports = {
  
  stateAdd,
  getState,
  EditState,
  UpdateState,
  DeleteState,
  statusState
};
