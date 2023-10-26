//Add Property

const PropertyAdd = ({
  BadRequestError,
  doProperty,
  doPropertyDetail,
  doPropertyImg,
  doPropertyfeatures,
  doPropertyFloorImg
}) => async (httpRequest) => {
  const {
    name,
    ship,
    address,
    address2,
    room,
    option,
    p_unit,
    description,
    tot_price,
    faceid,
    pincode,
    location_id,
    city_id,
    state_id,
    area,
    flooring,
    p_floor,
    bath,
    floor,
    age,
    type,
    p_typeid,
    check_list,
    cus_id
  } = httpRequest.body;
  const { pro_id, img, featureimage, floor_img } = httpRequest.files;
  let floorimges;
  let featureimageFilename;
  let imgFilenames;
  if (Array.isArray(img)) {
    imgFilenames = img.map((image) => image.filename);
  } else {
    imgFilenames = [];
  }
  if (Array.isArray(floor_img)) {
    floorimges = floor_img.map((image) => image.filename);
  } else {
    floorimges = [];
  }

  if (featureimage) {
    featureimageFilename = featureimage[0].filename;
    console.log(featureimage);
  } else {
    featureimageFilename

  }
  console.log("futureimage", featureimageFilename)
  const featuresResult = await doProperty({
    name,
    ship,
    address,
    address2,
    room,
    option,
    p_unit,
    description,
    tot_price,
    faceid,
    pincode,
    location_id,
    city_id,
    state_id,
    area,
    flooring,
    p_floor,
    bath,
    floor,
    age,
    type,
    p_typeid,
    cus_id,

    featureimage: featureimageFilename,
  });
  // const images = httpRequest.files.map(file => file.filename);

  const Result = await doPropertyImg({
    filename: imgFilenames,
    pro_id: featuresResult.id,
    type,
  });
  console.log("result", Result)
  const Resulttt = await doPropertyFloorImg({
    filename: floorimges,
    pro_id: featuresResult.id,
    type: 2,
  });


  const propertyfeature = await doPropertyfeatures({
    pro_id: featuresResult.id,
    check_list
  });


  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Property Added Successfully!',
      por_id: featuresResult.id,
    },
  };
};


// view property 
const GetProperty = ({
  BadRequestError,
  doGetProperty,
  property,
  State, City,
  Location,
  // GALLERY,
  propertyTypes,
  Facing,
  User,
  Role
}) => async (httpRequest) => {
  const data = await doGetProperty({
    // propertyperealtions,
    property,
    BadRequestError,
    State,
    City,
    Location,
    propertyTypes,
    Facing,
    User,
    Role
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Property  successfully!',
      data,
    },
  };
};







//  Update Property Type
const updateProperty =
  ({ doUpdateProperty, property, BadRequestError, doUpdatePropertyfeatures,
    doUpdatePropertyImg }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      const UpdateData = httpRequest.body;
      // const images = httpRequest.files.map(file => file.filename);
      // console.log(images, "dss");
      const { img, featureimage, floor_img } = httpRequest.files;
      let floorimges;
      let featureimageFilename;
      let imgFilenames;
      if (Array.isArray(img)) {
        imgFilenames = img.map((image) => image.filename);
      } else {
        imgFilenames = [];
      }
      if (Array.isArray(floor_img)) {
        floorimges = floor_img.map((image) => image.filename);
      } else {
        floorimges = [];
      }

      if (featureimage) {
        featureimageFilename = featureimage[0].filename;
      } else {
        featureimageFilename
      }
      console.log("updateee", UpdateData)
      await doUpdateProperty({
        id,
        property,
        BadRequestError,
        UpdateData,
        featureimageFilename
      });

      await doUpdatePropertyImg({
        filename: imgFilenames,
        pro_id: id,
        type: UpdateData.type,
        floorimges,
      });

      const propertyfeature = await doUpdatePropertyfeatures({
        pro_id: id,
        check_list: UpdateData.check_list
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "The Property has been updated successfully!",
          id
        },
      };
    };


//status data
const status = ({
  doStatus,
  Facing,
  BadRequestError,
  validateFeaturesStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let { status } = httpRequest.body;
  status = (status === "Y") ? "N" : "Y"
  const data = await doStatus({
    id,
    Facing,
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




const DeleteProperty = ({
  BadRequestError,
  doDeleteProperty,
  id
}) => async (httpRequest) => {
  const {
    id
  } = httpRequest.params;
  const data = await doDeleteProperty({
    BadRequestError,
    id,

  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted Property details successfully!',
      data,
    },
  };
};




// property searching 
const searchProperty = ({
  doSearchProperty,
  property,
  State,
  City,
  Location,
  // GALLERY,
  propertyTypes,
  Facing,
  User,
  Role,
  BadRequestError,
}) => async (httpRequest) => {
  const { option,
    p_typeid,
    location_id,
    city_id,
    state_id,
    status,
    featured,
    BadRequestError,
    cus_id,
    tot_price,
    id } = httpRequest.body;
  console.log("BODY DATA=>>>", httpRequest.body);
  const data = await doSearchProperty({
    option,
    p_typeid,
    location_id,
    tot_price,
    city_id,
    state_id,
    property,
    status,
    featured,
    BadRequestError,
    cus_id,
    id,
    State,
    City,
    Location,
    User,
    Role, propertyTypes,
    Facing,
    BadRequestError,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Property Search successfully!',
      data,
    },
  };
};



//Get PropertyType
const getPropertytype = ({
  BadRequestError,
  doGetPropertyType,


}) => async (httpRequest) => {
  const data = await doGetPropertyType({
    BadRequestError,

  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Property Type Successfully!',
      data,
    },
  };
};





// property detail by id  description&Renark 
const getPropertybyid = ({
  BadRequestError,
  doGetPropertybyid,
  propertyImage,
  Propertyfeature
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetPropertybyid({
    BadRequestError,
    propertyImage,
    Propertyfeature,
    id
  });
  console.log("httttp", httpRequest)
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'View  Property  successfully!',
      data,
    },
  };
};

// Update property description & remark

const updateDescription =
  ({ doUpdateDescription, BadRequestError }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      const PropertyUpdateData = httpRequest.body;
      const data = await doUpdateDescription({
        id,
        BadRequestError,
        PropertyUpdateData,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Property Description & Remark Update Successfully!!",
          data,
        },
      };
    };



// Property featured & unfeatured
const updateFeatured = ({
  doUpdateFeatured,
  BadRequestError,
  // validateAgentStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let { featured } = httpRequest.body;
  featured = (featured === 1) ? 0 : 1
  const data = await doUpdateFeatured({
    id,
    BadRequestError,
    featured
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'property information  updated successfully!',
      data,
    },
  };
};








module.exports = {
  PropertyAdd,
  GetProperty,
  DeleteProperty,
  updateProperty,
  searchProperty,
  status,
  getPropertytype,
  getPropertybyid,
  updateDescription,
  updateFeatured


};
