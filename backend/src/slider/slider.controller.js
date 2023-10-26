//Add Slider 
const SliderAdd = ({
  BadRequestError,
  doAddSlider,
  validateAddSlider,
}) => async (httpRequest) => {
  const {
    title
  } = httpRequest.body;
  const {
    filename
  } = httpRequest.file;

    const Result = await doAddSlider({ 
      title,
      filename
    });
    return {
      statusCode: 200,
      body: {  
        success: true,
        message: 'Slider added successfully!',
        data: Result,
      },
    };
};




//Get Slider
const getSlider = ({
  BadRequestError,
  doGetSlider,
  Slider
}) => async (httpRequest) => {
  const data = await doGetSlider({
    BadRequestError,
    Slider
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Slider Fetch successfully!',
      data,
    },
  };
};

// Update Slider
const updateSlider = ({
  doUpdateSlider,
  Slider,
  BadRequestError,
  validateUpdateSlider
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  sliderdata  = httpRequest.body;
  const {filename} = httpRequest.file;
  const data = await doUpdateSlider({
    id,
    Slider,
    filename,
    BadRequestError,
    sliderdata
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Slider update successfully!',
      data,
    },
  };
};
 

//Status

const StatusSlider = ({
  doStatusSlider,
  Slider,
  BadRequestError,
  validateStatusSlider
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = httpRequest.body;
  status=(status==="Y")?"N":"Y"
  const { error } = validateStatusSlider(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doStatusSlider({
    id,
    Slider,
    BadRequestError,
    status
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: ' Status update successfully!',
      data,
    },
  };
};

//Edit Slider
  const EditSlider = ({
    doEditSlider,
    Slider
  }) => async (httpRequest) => {
    const { id } = httpRequest.params;
    const data = await doEditSlider({
      id,
      Slider
    });
    console.log("data==>>",data);
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Slider fetch successfully!',
        data,
      },
    };
  };


//Delete Slider 

const Sliderdelete = ({
  BadRequestError,
  doDeleteSlider
  
}) => async (httpRequest) => {
  const {
    id,
  } = httpRequest.params;
 
  const data = await doDeleteSlider({
    id,
    BadRequestError
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Slider Delete successfully!',
      data,
    },
  };
};
module.exports = {
  SliderAdd,
  getSlider,
  EditSlider,
  updateSlider,
  Sliderdelete,
  StatusSlider
};
