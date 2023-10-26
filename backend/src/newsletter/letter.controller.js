const letterAdd = ({ BadRequestError, doLetter, validateAddLetterData }) => async (httpRequest) => {
  const { title, description } = httpRequest.body;

  const { error } = validateAddLetterData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);

  const letterResult = await doLetter({
    title, description
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'News letter added successfully!',
      data: letterResult,
    },
  };
};


const getLetter = ({
  BadRequestError,
  doGetLetter,
  Letter
}) => async (httpRequest) => {

  const data = await doGetLetter({
    BadRequestError,
    Letter
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Newsletter successfully!',
      data,
    },
  };
};

const deleteLetter = ({ BadRequestError, Letter, doDeleteLetter,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doDeleteLetter({
    id,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Newsletter deleted successfully!',
      data,
    },
  };
};

const updateLetter =
  ({ doUpdateLetter, Letter, BadRequestError, validateUpdateLetterData }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      const LetterUpdateData = httpRequest.body;

      const {
        error,
      } = validateUpdateLetterData(httpRequest.body);
      if (error) throw new BadRequestError(error.message);

      const data = await doUpdateLetter({
        id,
        Letter,
        BadRequestError,
        LetterUpdateData,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Letter updated successfully!",
          data,
        },
      };
    };

// View By Id
const getNewsletterpreviewbyid = ({
  doGetNewsletterpreviewbyid,
  Letter
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetNewsletterpreviewbyid({
    id,
    Letter
  });
  console.log("data==>>", data);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Newsletter previewbyid data successfully',
      data,
    },
  };
};


// View Subscribe
const getNewsletterSubscribe = ({
  BadRequestError,
  doGetNewslettersubscribe,
  Subscribe
}) => async (httpRequest) => {
  const data = await doGetNewslettersubscribe({
    Subscribe,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Subscribes  successfully!',
      data,
    },
  };
};


// View Newsletter Builder view 
const getNewsletterBuilder = ({
  BadRequestError,
  doGetNewsletterBuilder,
  Builder
}) => async (httpRequest) => {
  const data = await doGetNewsletterBuilder({
    Builder,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Builder Data successfully!',
      data,
    },
  };
};

// View Newsletter Agents
const getNewsletterAgent = ({
  BadRequestError,
  doGetNewsletterAgent,
  Agent
}) => async (httpRequest) => {
  const data = await doGetNewsletterAgent({
    Agent,
    BadRequestError,

  })
  return {
    statusCode: 200,
    body: {
      success: true,
      message: "NewsLetter Agents View Successfully!!",
      data,
    }
  }
}



module.exports = {
  letterAdd,
  getLetter,
  deleteLetter,
  updateLetter,
  getNewsletterpreviewbyid,
  getNewsletterSubscribe,
  getNewsletterBuilder,
  getNewsletterAgent

}