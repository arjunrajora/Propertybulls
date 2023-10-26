// Add Builder
const addVisibilityMatrix = ({
  BadRequestError,
  doVisibilityMatrix,
}) => async (httpRequest) => {
  const VisibilityMatrixdata = httpRequest.body
  const data = await doVisibilityMatrix({ VisibilityMatrixdata });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Visibility Matrix Saved  successfully!',
      data,
    },
  };
};

const getVisibilityMatrix = ({
  BadRequestError,
  dogetVisibilityMatrix,
  VisibilityMatrix
}) => async (httpRequest) => {
  const data = await dogetVisibilityMatrix({

    VisibilityMatrix
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: ' ViewAll Visibility Matrix  successfully!',
      data,
    },
  };
};
module.exports = {
  addVisibilityMatrix,
  getVisibilityMatrix

};
