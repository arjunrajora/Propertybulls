//Add Seo 
const SeoAdd = ({
  BadRequestError,
  doAddSeo,
  validateAddSeo
}) => async (httpRequest) => {
  const {
    page,
    location,
    title,
    keyword,
    description,
  } = httpRequest.body;
  const {
    error,
  } = validateAddSeo(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
    const faqResult = await doAddSeo({
      page,
      location,
      title,
      keyword,
      description,
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Seo added successfully!',
        data: faqResult,
      },
    };
};


//Get Seo
const getSeo = ({
  BadRequestError,
  doGetSeo,
  Seo
}) => async (httpRequest) => {
  const data = await doGetSeo({
    BadRequestError,
    Seo
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Seo successfully!',
      data,
    },
  };
};



// Update Seo
const updateSeo = ({
  doUpdateSeo,
  Seo,validateUpdatSeo,
  BadRequestError,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  SeoUpdateData  = httpRequest.body;
  const { error } = validateUpdatSeo(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateSeo({
    id,
    Seo,
    BadRequestError,
    SeoUpdateData
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Seo updated successfully!',
      data,
    },
  };
};

//

const status = ({
  dostatus,
  Seo,validatestatus,
  BadRequestError,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  {status}  = httpRequest.body;
  const { error } = validatestatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await dostatus({
    id,
    Seo,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Seo updated successfully!',
      data,
    },
  };
};
 

//Edit Seo

  const EditSeo = ({
    doEditSeo,
    Seo
  }) => async (httpRequest) => {
    const { id } = httpRequest.params;
    const data = await doEditSeo({
      id,
      Seo
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'fetched Seo successfully!',
        data,
      },
    };
  };


//Delete Seo 

const Seodelete = ({
  BadRequestError,
  doDeleteSeo
  
}) => async (httpRequest) => {
  const {
    id,
  } = httpRequest.params;
 
  const data = await doDeleteSeo({
    id,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted Seo successfully!',
      data,
    },
  };
};  
module.exports = {
  SeoAdd,
  getSeo,
  EditSeo,
  updateSeo,
  Seodelete,
  status
  
 

};
