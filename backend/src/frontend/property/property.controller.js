
//Get Allproperty
const getAllproperty = ({
    BadRequestError,
    doGetAllproperty,
    Allproperty,
    User,
    Location,
    propertyTypes,
    SaveOrder,Subscription
}) => async (httpRequest) => {

    const data = await doGetAllproperty({
        BadRequestError,
        Allproperty, User, Location, propertyTypes,
        SaveOrder,Subscription
    });

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Allproperty fatch successfully for buy!',
            data,
        },
    };
};



// Get Allproject
const getAllproject = ({
    BadRequestError,
    doGetAllproject,
    Allproject,
    User,
    Location,
    propertyTypes,
    SaveOrder ,Subscription
}) => async (httpRequest) => {
    const data = await doGetAllproject({
        BadRequestError,
        Allproject,
        User,
        Location,
        propertyTypes,
        SaveOrder ,Subscription
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "All projects fatch successfully",
            data,
        }
    }
}

// Rent Allrentproperties
const getAllrentproperties = ({
    BadRequestError,
    doGetAllrentproperties,
    Allrentproperties,
    User,
    Location,
    propertyTypes,
    SaveOrder,Subscription

}) => async (httpRequest) => {
    const data = await doGetAllrentproperties({
        BadRequestError,
        Allrentproperties,
        User,
        Location,
        propertyTypes,
        SaveOrder,Subscription

    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch Allrentproperties  successfully",
            data,
        }
    }
}


// Rent Projects
const getRentprojects = ({
    BadRequestError,
    doGetRentprojects,
    Rentprojects,
    User,
    Location,
    propertyTypes
}) => async (httpRequest) => {
    const data = await doGetRentprojects({
        BadRequestError,
        Rentprojects,
        User,
        Location,
        propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch Rent projects  successfully",
            data,
        }
    }
}

// Recent projects 

const getRecentprojects = ({
    BadRequestError,
    doGetRecentprojects,
    Recentprojects,
    Location
}) => async (httpRequest) => {
    const data = await doGetRecentprojects({
        BadRequestError,
        Recentprojects,
        Location
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Recent projects Fatch successfully",
            data,
        }

    }
}

// Real-Estate-Buy-Rent-Residential

const getResidential = ({
    BadRequestError,
    doGetResidential,
    Residential,
    User,
    Location,
    propertyTypes
}) => async (httpRequest) => {
    const data = await doGetResidential({
        BadRequestError,
        Residential,
        User,
        Location,
        propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch Residential  successfully",
            data,
        }
    }
}

// Real-Estate-Buy-Rent-Commercial

const getCommercial = ({
    BadRequestError,
    doGetCommercial,
    Commercial,
    User,
    Location,
    propertyTypes
}) => async (httpRequest) => {
    const data = await doGetCommercial({
        BadRequestError,
        Commercial,
        User,
        Location,
        propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch Commercial  successfully",
            data,
        }
    }
}

// Residential-Plot-Land-For-Sale-In-Jaipur
const getResidentialPlot = ({
    BadRequestError,
    doGetResidentialPlot,
    ResidentialPlot,
    User,
    Location,
    propertyTypes
}) => async (httpRequest) => {
    const data = await doGetResidentialPlot({
        BadRequestError,
        ResidentialPlot,
        User,
        Location,
        propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch ResidentialPlot  successfully",
            data,
        }
    }
}



//Commercial-Land-for-sale-in-Jaipur

const getCommercialLand = ({
    BadRequestError,
    doGetCommercialLand,
    CommercialLand,
    User,
    Location,
    propertyTypes
}) => async (httpRequest) => {
    const data = await doGetCommercialLand({
        BadRequestError,
        CommercialLand,
        User,
        Location,
        propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch CommercialLand  successfully",
            data,
        }
    }
}

// ResidentialHouse-for-sale-in-Jaipur
const getResidentialHouse = ({
    BadRequestError,
    doGetResidentialHouse,
    ResidentialHouse,
    User,
    Location,
    propertyTypes
}) => async (httpRequest) => {
    const data = await doGetResidentialHouse({
        BadRequestError,
        ResidentialHouse,
        User,
        Location,
        propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch ResidentialHouse  successfully",
            data,
        }
    }
}


// commercial-shop-for-sale-in-Jaipur

const getCommercialShop = ({
    BadRequestError,
    doGetCommercialShop,
    CommercialShop,
    User,
    Location,
    propertyTypes
}) => async (httpRequest) => {
    const data = await doGetCommercialShop({
        BadRequestError,
        CommercialShop,
        User,
        Location,
        propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch CommercialShop  successfully",
            data,
        }
    }
}



// view property type with status Y&N

const getPropertytypes = ({
    BadRequestError,
    dogetpropertyTypes
    , propertyTypes
}) => async (httpRequest) => {
    const { type } = httpRequest.body
    const data = await dogetpropertyTypes({
        type,
        BadRequestError,
        propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "viewAll Property type successfully",
            data,
        }
    }
}


// view All property types

const getPropertytype = ({
    BadRequestError,
    dogetpropertyType
    , propertyTypes
}) => async (httpRequest) => {
    const data = await dogetpropertyType({
        BadRequestError,
        propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch Property type successfully",
            data,
        }
    }
}












// propertyAdded for frontend

const propertyAdd =
    ({ BadRequestError,
        doProperty }) =>
        async (httpRequest) => {
            const { state_id,
                rera_registration,
                build_id,
                cus_id,
                carpet,
                build,
                b_unit,
                vid_url,
                t_type,
                area_in_sqft,
                name,
                ship,
                address,
                address2,
                room,
                option,
                p_unt,
                description,
                tot_price,
                faceid,
                pincode,
                age,
                location_id,
                city_id,
                area,
                flooring,
                p_floor,
                bath,
                floor,
                remark,
                a_unit,
                p_unit,
                p_typeid,
                deposit,
                rent,
                security_deposit,
                type
            } = httpRequest.body;
            const propertyResult = await doProperty({
                state_id,
                rera_registration,
                build_id,
                cus_id,
                carpet,
                build,
                b_unit,
                vid_url,
                t_type,
                area_in_sqft,
                name,
                ship,
                address,
                age,
                rent,
                security_deposit,
                address2,
                room,
                option,
                p_unt,
                description,
                tot_price,
                faceid,
                pincode,
                location_id,
                city_id,
                area,
                flooring,
                p_floor,
                bath,
                floor,
                remark,
                a_unit,
                p_unit,
                p_typeid,
                deposit,
                type
            });
            return {
                statusCode: 200,
                body: {
                    success: true,
                    message: "The Property has been added successfully.Property will display after admin approval.!!",
                    data: propertyResult,
                },
            };
        };


// propertyAdded features Features with images


const featurespropertyAdd = ({
    BadRequestError,
    doPropertyImg,
    doPropertyfeatures,
    doFeatureimage,
    doPropertyFloorImg
}) => async (httpRequest) => {
    const {
        pro_id, type, check_list
    } = httpRequest.body;
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
        console.log(featureimage);
    } else {
        featureimageFilename

    }
    console.log("floor_img", floorimges)
    const featuresimg = await doFeatureimage({
        filename: featureimageFilename,
        id: pro_id,
        type,
    });
    const Result = await doPropertyImg({
        filename: imgFilenames,
        pro_id,
        type,
    });
    const Resulttt = await doPropertyFloorImg({
        filename: floorimges,
        pro_id,
        type: 2,
    });

    const propertyfeature = await doPropertyfeatures({
        pro_id,
        check_list
    });

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'The Property has been added successfully.Property will display after admin approval.!!',
            pro_id: pro_id,
        },
    };
};















// Property edit&Update

const updateProperty =
    ({ doUpdateProperty, property, BadRequestError, doUpdatePropertyfeatures,
        doUpdatePropertyImg }) =>
        async (httpRequest) => {
            const { id } = httpRequest.params;
            const UpdateData = httpRequest.body;
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



// propertyget by id 
const getPropertybyid = ({
    BadRequestError,
    doGetPropertybyid,
    Propertyfeature,
    propertyImage
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    const data = await doGetPropertybyid({
        BadRequestError,
        Propertyfeature,
        propertyImage,
        id,

    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Fetched property data successfully!',
            data,
        },
    };
};


// view property features added property
const getFeatures = ({
    BadRequestError,
    doGetPropertyFeatures,
    Type,
    Features

}) => async (httpRequest) => {
    const data = await doGetPropertyFeatures({
        BadRequestError,
        Type,
        Features
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Fetched Property Features successfully!',
            data,
        },
    };
};








// view in RECENTLY ADDED PROPERTIES

const getresentpropertyadd = ({
    BadRequestError,
    dogetresentproperty,
    cus_id,
    property
}) => async (httpRequest) => {
    const { cus_id } = httpRequest.body
    const data = await dogetresentproperty({
        BadRequestError,
        cus_id,
        property
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch property  successfully",
            data,
        }
    }
}


const getpropertybycustomer = ({
    BadRequestError,
    dogetpropertybycustum,
    cus_id,
    property
}) => async (httpRequest) => {
    const { cus_id } = httpRequest.body
    const data = await dogetpropertybycustum({
        BadRequestError,
        cus_id,
        property
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: "Fatch property  successfully",
            data,
        }
    }
}



// view property floor plan 

// const getPropertyfloorplan = ({
//     BadRequestError,
//     doGetPropertyfloorplan,
// }) => async (httpRequest) => {
//     const data = await doGetPropertyfloorplan({
//         BadRequestError,

//     });
//     return {
//         statusCode: 200,
//         body: {
//             success: true,
//             message: 'Fetched Property Floor plan successfully!',
//             data,
//         },
//     };
// };

// const getPropertyfloorplan = ({
//     BadRequestError,
//     doGetPropertyfloorplan,

// }) => async (httpRequest) => {
//     const { id } = httpRequest.params;
//     const data = await doGetPropertyfloorplan({
//         BadRequestError,
//         id,

//     });
//     return {
//         statusCode: 200,
//         body: {
//             success: true,
//             message: 'Fetched Property Floor plan successfully!',
//             data,
//         },
//     };
// };




const getPostedByAgent = ({
    BadRequestError,
    doGetpostbuyagnet,
    User,
    property,
    Role,
    Location, propertyTypes
}) => async (httpRequest) => {
    const data = await doGetpostbuyagnet({
        BadRequestError,
        User,
        property,
        Role,
        Location, propertyTypes
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Fetched Property Features successfully!',
            data,
        },
    };
};


// View property Facing

const getFace = ({
    BadRequestError,
    doGetPropertyFace,
    Facing
}) => async (httpRequest) => {
    const data = await doGetPropertyFace({
        BadRequestError,
        // Facing
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Fetched Property Face Successfully!',
            data,
        },
    };
};










module.exports = {

    getAllproperty,
    getAllproject,
    getAllrentproperties,
    getRecentprojects,
    getRentprojects,
    getResidential,
    getCommercial,
    getResidentialPlot,
    getCommercialLand,
    getResidentialHouse,
    getCommercialShop,
    getPropertytypes,
    propertyAdd,
    getresentpropertyadd,
    getpropertybycustomer,
    featurespropertyAdd,
    getFeatures,
    updateProperty,
    getPropertybyid,
    getPropertytype,
    getPostedByAgent,
    getFace
};
