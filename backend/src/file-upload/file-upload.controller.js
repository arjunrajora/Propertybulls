// const generateSignedUrl = ({
//   BadRequestError,
//   validateFileName,
//   doGenerateSignedUrl,
//   User,
// }) => async (httpRequest) => {
//   const { error } = validateFileName(httpRequest.params);
//   if (error) throw new BadRequestError('Provide a valid file name!');

//   const { fileName } = httpRequest.params;
//   const { userId } = httpRequest.user;

//   const signedUrl = await doGenerateSignedUrl({
//     userId,
//     fileName,
//     User,
//   });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Uploaded image successfully!',
//       data: signedUrl,
//     },
//   };
// };

const uploadProfile = ({
  User,
  doUploadProfile,
  validateFileName,
}) => async (req, res) => {

  // const { fileName } = httpRequest.body;
  console.log(req); 
  return false;
  // const { userId } = httpRequest.user;
  const upload = await doUploadProfile({
    User,
    // userId,
    fileName,
  });  
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Uploaded Profile image successfully!',
      data: upload,
    },
  };
};

// const uploadTeacherDocuments = ({
//   Teacher,
//   User,
//   doUploadDocuments,
//   BadRequestError,
//   validateFileName,
//     superAdminTemplate,
//   emailTransporter,
//   sendGridTransporter,
// }) => async (httpRequest) => {
//   const { fileName, documentType } = httpRequest.body;
//   const { userRoleId, userId } = httpRequest.user;

//   const upload = await doUploadDocuments({
//     User,
//     Teacher,
//     userRoleId,
//     fileName,
//     userId,
//     documentType,
//     superAdminTemplate,
//     emailTransporter,
//     sendGridTransporter,
//   });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Uploaded Document successfully!',
//       data: upload,
//     },
//   };
// };
module.exports = {
  uploadProfile,
  // generateSignedUrl,
  // uploadTeacherDocuments,
};
