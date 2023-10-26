// const AWS = require('aws-sdk');
const uuid = require('uuid').v4;

const {
  S3_ENDPOINT,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_REGION,
  S3_SIGNATURE_VERSION,
  S3_BUCKET_URL,
} = require('config');

// const options = {
//   endpoint: new AWS.Endpoint(S3_ENDPOINT),
//   accessKeyId: S3_ACCESS_KEY_ID,
//   secretAccessKey: S3_SECRET_ACCESS_KEY,
//   region: S3_REGION,
//   signatureVersion: S3_SIGNATURE_VERSION,
// };
// AWS.config.update(options);
// const s3 = new AWS.S3();

const params = {
  Expires: 60 * 10, // ten minutes,
  ACL: 'public-read',
};

// const doGenerateSignedUrl = async ({ userId, fileName }) => {
//   fileName = fileName.replace(/[^0-9a-zA-Z.]/g,'_').replace(/__/g,'_');
//   params.Bucket = `${S3_BUCKET_URL}/${userId}`;
//   params.Key = fileName.toLowerCase();
//   const response = await s3.getSignedUrl('putObject', params);
//   return {
//     url: response,
//     fileName: params.Key,
//   };
// };

const doUploadProfile = async ({
  User,
  userId,
  fileName,
}) => {
  const profile = `https://localhost/3000/api/v1/uploads`;
  const user = await User.update({ profile }, {
    where: {
      id: userId,
      fileName
    },
  });
  return user;
};

// const doUploadDocuments = async ({
//   Teacher,
//   User,
//   userRoleId,
//   fileName,
//   userId,
//   documentType,
//   superAdminTemplate,
//   emailTransporter,
//   sendGridTransporter,
// }) => {
//   const document = fileName && fileName.includes(',')
//       ? fileName
//       : `https://${S3_BUCKET_URL}.${S3_ENDPOINT}/${userId}/${fileName}`;
//   const user = await Teacher.update({ document, documentType }, {
//     where: {
//       id: userRoleId,
//     },
//   });
//   const teacher = await Teacher.findOne({
//     include:{
//       model: User,
//     },
//     where: {
//       id: userRoleId,
//     },
//   });
//   const payload = { firstName: teacher.firstName, lastName: teacher.lastName, teacherId: teacher.id, teacherEmail: teacher.User.email };
//   const template = superAdminTemplate({
//     fromUser: 'Glu',
//     fromEmail: 'hello@glulearning.com',
//     payload,
//   });

//   // await emailTransporter.send(template);
//   await sendGridTransporter.sendMail(template);
//   return user;
// };
module.exports = {
  // doGenerateSignedUrl,
  doUploadProfile,
  // doUploadDocuments,
};
