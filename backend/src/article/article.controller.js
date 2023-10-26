// Add Article 
const
  addArticle = ({
    BadRequestError,
    doArticle,
    validateAddSlider,
  }) => async (httpRequest) => {
    const {
      title,
      content
    } = httpRequest.body;
    const {
      filename
    } = httpRequest.file;

    const article = await doArticle({
      title,
      content,
      filename
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Article added successfully!',
        data: article,
      },
    };
  };



// View Article
const getArticle = ({
  BadRequestError,
  doGetArticle,
  Article
}) => async (httpRequest) => {
  const data = await doGetArticle({
    Article,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Articles details successfully!',
      data,
    },
  };
};

// Update Article
const updateArticle = ({
  doUpdateArticle,
  Article,
  BadRequestError,
  validateArticleUpdateData
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const ArticleUpdateData = httpRequest.body;
  // const {filename} = httpRequest.file;
  var filename
  if (httpRequest.file) {
    var { filename } = httpRequest.file;
  }
  const data = await doUpdateArticle({
    id,
    Article,
    BadRequestError,
    ArticleUpdateData,
    filename
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Article updated successfully!',
      data,
    },
  };
};

// Delete Article
const deleteArticle = ({ doDeleteArticle, BadRequestError }) => async (
  httpRequest,
) => {
  const { id } = httpRequest.params;
  const data = await doDeleteArticle({
    id,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Article deleted successfully!',
      data,
    },
  };
};

// View By Id
const getArticleById = ({
  doGetArticleById,
  Article
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetArticleById({
    id,
    Article
  });
  console.log("data==>>", data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Article successfully!',
      data,
    },
  };
};

// Update Status
const updateArticleStatus = ({
  doUpdateArticleStatus,
  Article,
  BadRequestError,
  validateUpdateArticleStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let { status } = (httpRequest.body);
  status = (status === 'Y') ? 'N' : 'Y';
  const {
    error,
  } = validateUpdateArticleStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateArticleStatus({
    id,
    Article,
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

module.exports = {
  addArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleById,
  updateArticleStatus
};
