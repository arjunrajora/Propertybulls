// View Role
const getRole = ({
    BadRequestError,
    doGetRole,
    Role
  }) => async (httpRequest) => {
      const data = await doGetRole({
        Role,
        BadRequestError
      });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Fetched Roles details successfully!',
        data,
      },
    };
  };

  module.exports ={
    getRole
  }