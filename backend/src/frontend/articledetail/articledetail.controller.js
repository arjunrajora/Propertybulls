// View Articledetail
// const getArticledetail = ({
//   BadRequestError,
//   doGetArticledetail,
//   Articledetail
// }) => async (httpRequest) => {
//     const data = await doGetArticledetail({
//       Articledetail,
//       BadRequestError
//     });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Fetched Articledetails details successfully!',
//       data,
//     },
//   };
// };
  
const getArticledetail = ({
  doGetArticledetail,
  Articledetail
}) => async (httpRequest) => {
  const { url } = httpRequest.body;
  const data = await doGetArticledetail({
    url,
    Articledetail
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched user successfully!',
      data,
    },
  };
};
  module.exports = {
    getArticledetail,
  };
  