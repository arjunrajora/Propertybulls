// Add Builder
const addAdvertisementsubscription= ({
  BadRequestError,
  doAdvertisementsubscription,
}) => async (httpRequest) => {
const {filename}=httpRequest.file;
const banner=filename
  const {
    page,
duration,
discount,
email,
mobile,
redirect_link,
 name,
advertisement_id,
actual_amount,
package_amount,
 end_date,
 start_date,
position,
PayerID,
reference,
  } = httpRequest.body;
      const data = await doAdvertisementsubscription({
        page,
        duration,
        discount,
        banner,
        email,
        mobile,
        redirect_link,
         name,
        advertisement_id,
        actual_amount,
        package_amount,
         end_date,
         start_date,
        position,
        PayerID,
        reference,
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Advertisement Package added successfully!',
        data,
      },
    };
  }

// View Banner Position
const getAdvertisementPosition = ({
  BadRequestError,
  doGetAdvertisementPackage,
  BannerPosition
}) => async (httpRequest) => {
    const data = await doGetAdvertisementPackage({
      BadRequestError,
      BannerPosition
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Banner Position details successfully!',
      data,
    },
  };
};


const getAdvertisementsubscription= ({
  BadRequestError,
  doGetAdvertisementsubscription,
  Advertisement,
  Advertisementsubscription,
  BannerPosition
}) => async (httpRequest) => {
    const data = await doGetAdvertisementsubscription({
      BadRequestError,
      Advertisement,
      Advertisementsubscription,
      BannerPosition
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'advertisement subscription details successfully!',
      data,
    },
  };
};







const getBannerPageLocation = ({
  BadRequestError,
  doGetBannerPositionByPage,
  BannerPosition
}) => async (httpRequest) => {
const {page,banner_location}=  httpRequest.body
    const data = await doGetBannerPositionByPage({
      BadRequestError,
      page,
      banner_location,
      BannerPosition
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Banner Position details successfully!',
      data,
    },
  };
};
const getDurationByBannerPosition = ({
  BadRequestError,
  doGetDurationByBannerPosition,
  Advertisement
}) => async (httpRequest) => {
const {banner_position_id}=  httpRequest.body
    const data = await doGetDurationByBannerPosition({
      BadRequestError,
      banner_position_id,
      Advertisement
    });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Banner Position details successfully!',
      data,
    },
  };
};



// Update Builder
const updateAdvertisementPackage = ({
  doUpdateAdvertisementPackage,
  Builder,
  BadRequestError,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  BuilderUpdateData  = httpRequest.body;
  const data = await doUpdateAdvertisementPackage({
    id,
    Builder,
    BadRequestError,
    BuilderUpdateData,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Builder updated successfully!',
      data,
    },
  };
};


// Delete Builder
const deleteAdvertisementsubscription= ({ doDeleteAdvertisementsubscription,BadRequestError }) => async (
  httpRequest,
) => {
  const { id } = httpRequest.params;

    const data = await doDeleteAdvertisementsubscription({
      id,
      BadRequestError,
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Advertisement subscription deleted successfully!',
        data,
      },
    };
  };



// Update Status
const updateAdvertisementsubscriptionStatus = ({
  doUpdateAdvertisementsubscriptionStatus,
  Advertisement,
  BadRequestError,
  validateUpdateAdvertisementPackageStatus
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {status}  = (httpRequest.body);
  status = (status==='Y')?'N':'Y';
  const {
    error,
  } = validateUpdateAdvertisementPackageStatus(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doUpdateAdvertisementsubscriptionStatus({
    id,
    Advertisement,
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

const searchAdvertisementsubscription = ({
  doSearchAdvertisementsubscription,
  BadRequestError,
  Advertisement,
  BannerPosition
}) => async (httpRequest) => {
  const {
    startDate,
    endDate,
    page,
    duration,} = httpRequest.body;
  const data = await doSearchAdvertisementsubscription({
    startDate,
    endDate,page,
    duration,
    BadRequestError,
  Advertisement,
  BannerPosition
   });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Advertisement Subscription Search successfully!',
      data,
    },
  };
};


module.exports = {
  addAdvertisementsubscription,
  getAdvertisementPosition,
  getAdvertisementsubscription,
  getBannerPageLocation,
  updateAdvertisementPackage,
  deleteAdvertisementsubscription,
  updateAdvertisementsubscriptionStatus,
  searchAdvertisementsubscription,
  getDurationByBannerPosition
};
