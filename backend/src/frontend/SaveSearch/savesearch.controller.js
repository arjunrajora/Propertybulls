// Add Builder
const addSave = ({
  BadRequestError,
  doSave,
}) => async (httpRequest) => {
  const {
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
  } = httpRequest.body;
    const data = await doSave({
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
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'The Advance search type for selected page are updated successfully ',
        data,
      },
    };
};


// // View Builder
// const getBuilder = ({
//   BadRequestError,
//   doGetBuilder,
//   Builder,
//   Location,
//   State,
//   property
// }) => async (httpRequest) => {
//     const data = await doGetBuilder({
//       Builder,
//       BadRequestError,
//       Location,
//       State,
//       property
//     });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Fetched Builders details successfully!',
//       data,
//     },
//   };
// };

// // Update Builder
// const updateBuilder = ({
//   doUpdateBuilder,
//   Builder,
//   BadRequestError,
//   validateBuilderUpdateData
// }) => async (httpRequest) => {
//   const { id } = httpRequest.params;
//   const  BuilderUpdateData  = httpRequest.body;
//   var  filename
//   if(httpRequest.file){
//     var{filename} = httpRequest.file;
//   }
//   const { error } = validateBuilderUpdateData(httpRequest.body);
//   if (error) throw new BadRequestError(error.message);
//   const data = await doUpdateBuilder({
//     id,
//     Builder,
//     BadRequestError,
//     BuilderUpdateData,
//     filename
//   });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Builder updated successfully!',
//       data,
//     },
//   };
// };

// // Search Builder
// const searchBuilder = ({
//   doSearchBuilder,
//   Builder,
//   Location,property,
//   BadRequestError,
// }) => async (httpRequest) => {
//   const { name, mobile, startDate, endDate, loc_ids,status,featured } = httpRequest.body;
//   console.log("BODY DATA=>>>",httpRequest.body); 
//   const data = await doSearchBuilder({
//     name,
//     mobile,
//     startDate,
//     endDate,
//     loc_ids,
//     Builder,
//     Location,
//   property,
//     status,
//     featured,
//     BadRequestError,
//   });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Builder Search successfully!',
//       data,
//     },
//   };
// };

// // Delete Builder
const DeleteSaveSearch = ({ doDeleteSaveSearch,BadRequestError }) => async (
  httpRequest,
) => {
  const { id } = httpRequest.params;
    const data = await doDeleteSaveSearch({
      id,
      BadRequestError,
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Builder deleted successfully!',
        data,
      },
    };
  }


// View By Id
const getsavesearchById = ({
  doGetsavesearchById,
  Saveserch
}) => async (httpRequest) => {
  const { cus_id } = httpRequest.body;
  const data = await doGetsavesearchById({
    cus_id,
    Saveserch
  });
  // console.log("data==>>",data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched save data successfully!',
      data,
    },
  };
};

// Update Status
// const updateBuilderStatus = ({
//   doUpdateBuilderStatus,
//   Builder,
//   BadRequestError,
//   validateUpdateBuilderStatus
// }) => async (httpRequest) => {
//   const { id } = httpRequest.params;
//   let  {status}  = (httpRequest.body);
//   status = (status==='Y')?'N':'Y';
//   const {
//     error,
//   } = validateUpdateBuilderStatus(httpRequest.body);
//   if (error) throw new BadRequestError(error.message);
//   const data = await doUpdateBuilderStatus({
//     id,
//     Builder,
//     BadRequestError,
//     status
//   });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Status updated successfully!',
//       data,
//     },
//   };
// };

// // Update Featured
// const updateFeatured = ({
//   doUpdateFeatured,
//   Builder,
//   BadRequestError,
//   // validateAgentStatus
// }) => async (httpRequest) => {
//   const { id } = httpRequest.params;
//   let  {featured}  = httpRequest.body;
//   featured=(featured===1)?0:1
//   // const {
//   //   error,
//   // } = validateAgentStatus(httpRequest.body);
//   // if (error) throw new BadRequestError(error.message);
//   const data = await doUpdateFeatured({
//     id,
//     Builder,
//     BadRequestError,
//     featured
//   });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Featured updated successfully!',
//       data,
//     },
//   };
// };
// // View By Id
// const getProject = ({
//   doGetProject,
//   Builder,
//   property,
//   Location,
//   propertyTypes,
//   Facing,
//   Responses
// }) => async (httpRequest) => {
//   const { id } = httpRequest.params;
//   const data = await doGetProject({
//     id,
//     Builder,
//     property,
//     Location,
//     propertyTypes,
//     Facing,
//     Responses
//   });
//   console.log("data==>>",data);
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'fetched Property successfully!',
//       data,
//     },
//   };
// };


module.exports = {
  addSave,
  getsavesearchById,
  DeleteSaveSearch
 
};
