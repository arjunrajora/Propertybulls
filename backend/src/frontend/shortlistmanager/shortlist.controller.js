

const shortlistAdd =
  ({ BadRequestError, doShortlist,  }) =>
    async (httpRequest) => {
      const {  pro_id,usr_id,ip_add } = httpRequest.body;

      const { error } = (httpRequest.body);
      if (error) throw new BadRequestError(error.message);

      const shortlistResult = await doShortlist({
        pro_id,usr_id,ip_add
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Shortlist added successfully!",
          data: shortlistResult,
        },
      };
    };

// const getShortlist = ({ BadRequestError, doGetShortlist,Shortlist}) =>
//     async (httpRequest) => {
//       const data = await doGetShortlist({
//         Shortlist,
      
//         BadRequestError,
        
  
//       });
//       return {
//         statusCode: 200,
//         body: {
//           success: true,
//           message: "Fetched Shortlist  successfully!",
//           data,
//         },
//       };
//     };

    const getShortlist = ({
      doGetShortlist,
      Shortlist,
      Property,
      propertyTypes,User,Role,propertydetails
    }) => async (httpRequest) => {
      const { usr_id,ip_add,pro_id } = httpRequest.body;
      const data = await doGetShortlist({
        usr_id,
        ip_add
        ,pro_id,
    Shortlist,
    Property,
    propertydetails,
    propertyTypes,User,
    Role
      });
      // console.log("data==>>",data);
      return {
        statusCode: 200,
        body: {
          success: true,
          message: 'fetched property  successfully!',
          data,
        },
      };
    };
    



const deleteShortlist = ({ BadRequestError, Shortlist, doDeleteShortlist,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doDeleteShortlist({
    id,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Shortlist deleted successfully!',
      data,
    },
  };
};




const Shortlistdeleteinproperty = ({ BadRequestError, Shortlist, doDeleteShortlistinproperty,
}) => async (httpRequest) => {
  const { pro_id } = httpRequest.body;
  
  console.log(pro_id);
  const data = await doDeleteShortlistinproperty({
    pro_id,
  });

  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Shortlist deleted successfully!',
      data,
    },
  };
};


const Shortlistget = ({
  BadRequestError,
  doShortlistget ,
  Shortlist
}) => async (httpRequest) => {
    const data = await doShortlistget({
      Shortlist,
      BadRequestError,
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'shortlist details successfully!',
      data,
    },
  };
};







module.exports = {
  shortlistAdd,
  getShortlist,
  deleteShortlist,
  Shortlistdeleteinproperty,
  Shortlistget
};
