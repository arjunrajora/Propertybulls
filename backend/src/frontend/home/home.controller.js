
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

const getdataHome = ({
    BadRequestError,
    doGethomeDate,
    doGetProject,
    doGetProjectgallery,
    doGetBuilder,
    doGetArticle

}) => async (httpRequest) => {

    const SliderData = await doGethomeDate({
        BadRequestError,
    });
    const ProjectofMonth = await doGetProject({
        BadRequestError,
    });
    const ProjectofGallery = await doGetProjectgallery({
        BadRequestError,
    });
    const builder = await doGetBuilder({
        BadRequestError,
    });
    const Articles = await doGetArticle({
        BadRequestError
    });
    return {
        statusCode: 200,
        body: [
            {
                success: true,
                SliderData,
                ProjectofMonth,
                ProjectofGallery,
                builder,
                Articles
            }],
    };
};



//Get Project of the month
const getProject = ({
    BadRequestError,
    doGetProject,
    Project
}) => async (httpRequest) => {

    const data = await doGetProject({
        BadRequestError,
        Project
    });

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Project Fetch success!',
            data,
        },
    };
};


//Get Projectgallery
const getProjectgallery = ({
    BadRequestError,
    doGetProjectgallery,
    Projectgallery
}) => async (httpRequest) => {

    const data = await doGetProjectgallery({
        BadRequestError,
        Projectgallery
    });

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Projectgallery Fetch successfully!',
            data,
        },
    };
};


// View Associate  Builder 
const getBuilder = ({
    BadRequestError,
    doGetBuilder,
    Builder,
    Location,
    State
}) => async (httpRequest) => {
    const data = await doGetBuilder({
        Builder,
        BadRequestError,
        Location,
        State
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Fetched Builders details successfully!',
            data,
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




// Search Property
const searchProperty = ({
    doSearchProperty,
    Property,
    BadRequestError,
    User,
    Location,
    VisibilityMatrix,
    propertyTypes
    ,SaveOrder,
    Subscription
}) => async (httpRequest) => {
    const { id, option, city_id, location_id, state_id, p_typeid, room, tot_price, age, area ,type} = httpRequest.body;
    const data = await doSearchProperty({
        id,
        option,
        city_id,
        location_id,
        state_id,
        p_typeid,
        room,
        age,
        area,
        Property,
        tot_price,
        BadRequestError,
        User,
        Location,
        propertyTypes,SaveOrder,
        Subscription,
        VisibilityMatrix,
        type
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



// view All property 
const getProperty = ({
    BadRequestError,
    doGetProperty,
    property
}) => async (httpRequest) => {

    const data = await doGetProperty({
        BadRequestError,
        property
    });

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Property Fatch successfully',
            data,
        },
    };
};


// view all locations

const getLocation = ({
    BadRequestError,
    doGetLocation,
    Location
}) => async (httpRequest) => {

    const data = await doGetLocation({
        BadRequestError,
        Location
    });

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Location Fatch successfully',
            data,
        },
    };
};



// view property types
const getPropertytypes = ({
    BadRequestError,
    doGetPropertytypes,
    propertyTypes
}) => async (httpRequest) => {

    const data = await doGetPropertytypes({
        BadRequestError,
        propertyTypes
    });

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'propertyTypes Fatch successfully',
            data,
        },
    };
};









module.exports = {
    getSlider,
    getProject,
    getProjectgallery,
    getBuilder,
    getArticle,
    searchProperty,
    getProperty,
    getLocation,
    getPropertytypes,
    getdataHome
};
