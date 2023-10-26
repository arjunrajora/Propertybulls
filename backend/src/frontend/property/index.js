const router = require("express").Router();
const {
    JWT_ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    SIGN_OPTION,
    EMAIL,
    INVITATION_TOKEN_EXPIRES_IN,
} = require("config");

const { Allproperty, Location, User, Role, propertyTypes, SaveOrder,Subscription, property, Propertyfeature, propertyImage, Features, Type, Facing } = require("../../db");
const {
    doGetAllproperty,
    doGetAllproject,
    doGetAllrentproperties,
    doGetRentprojects,
    doGetRecentprojects,
    doGetResidential,
    doGetCommercial,
    doGetResidentialPlot,
    doGetCommercialLand,
    doGetResidentialHouse,
    doGetCommercialShop,
    dogetpropertyTypes,
    doProperty,
    dogetresentproperty,
    dogetpropertybycustum,
    doFeaturesproperty,
    doPropertyImg,
    doPropertyfeatures,
    doGetPropertyFeatures,
    doUpdateProperty,
    doGetPropertybyid,
    doUpdatePropertyImg,
    doUpdatePropertyfeatures,
    doFeatureimage,
    doPropertyFloorImg,
    dogetpropertyType,
    doGetpostbuyagnet,
    doGetPropertyFace
} = require("../../frontend/property/property.service");


const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("../../frontend/property/property.controller");

// Buy All properties
const getAllproperty = controller.getAllproperty({
    BadRequestError,
    doGetAllproperty,
    User,
    Location,
    propertyTypes,
    SaveOrder,Subscription
});
// Buy All projects
const getAllproject = controller.getAllproject({
    BadRequestError,
    doGetAllproject,
    User,
    Location,
    propertyTypes,
    SaveOrder ,Subscription
});
// post by agent 
const getPostedByAgent = controller.getPostedByAgent({
    BadRequestError,
    doGetpostbuyagnet,
    User,
    property,
    Role,
    Location, propertyTypes
});

// Rent properties
const getAllrentproperties = controller.getAllrentproperties({
    BadRequestError,
    doGetAllrentproperties,
    User,
    Location,
    propertyTypes,
    SaveOrder,Subscription

});

// Rent projects
const getRentprojects = controller.getRentprojects({
    BadRequestError,
    doGetRentprojects,
    User,
    Location,
    propertyTypes,
});


// Real-Estate-Buy-Rent-Residential
const getResidential = controller.getResidential({
    BadRequestError,
    doGetResidential,
    User,
    Location,
    propertyTypes
})
// Real-Estate-Buy-Rent-Commercial
const getCommercial = controller.getCommercial({
    BadRequestError,
    doGetCommercial,
    User,
    Location,
    propertyTypes
})

// Residential-Plot-Land-For-Sale-in-Jaipur
const getResidentialPlot = controller.getResidentialPlot({
    BadRequestError,
    doGetResidentialPlot,
    User,
    Location,
    propertyTypes
})
// commercial-land-for-sale-in-Jaipur
const getCommercialLand = controller.getCommercialLand({
    BadRequestError,
    doGetCommercialLand,
    User,
    Location,
    propertyTypes
})

// ResidentialHouse-for-sale-in-Jaipur
const getResidentialHouse = controller.getResidentialHouse({
    BadRequestError,
    doGetResidentialHouse,
    User,
    Location,
    propertyTypes
})

// commercial-shop-for-sale-in-Jaipur
const getCommercialShop = controller.getCommercialShop({
    BadRequestError,
    doGetCommercialShop,
    User,
    Location,
    propertyTypes
})

const getRecentprojects = controller.getRecentprojects({
    BadRequestError,
    doGetRecentprojects,
    Location,
});
// view Propertytype
const getPropertytypes = controller.getPropertytypes({
    BadRequestError,
    dogetpropertyTypes,
    propertyTypes
});

// view All property types
const getPropertytype = controller.getPropertytype({
    BadRequestError,
    dogetpropertyType,
    propertyTypes
});

// Added  PropertyAdded
const propertyAdd = controller.propertyAdd({
    BadRequestError,
    doProperty,
    property
});


// Added Features Property
const featurespropertyAdd = controller.featurespropertyAdd({
    BadRequestError,
    doPropertyImg,
    doPropertyfeatures,
    Propertyfeature,
    propertyImage,
    doFeatureimage,
    doPropertyFloorImg



});




// Edit  PropertyAdded
const updateProperty = controller.updateProperty({
    BadRequestError,
    doUpdateProperty,
    property,
    Propertyfeature,
    propertyImage,
    doUpdatePropertyImg,
    doUpdatePropertyfeatures,

});

// Property view by id 
const getPropertybyid = controller.getPropertybyid({
    BadRequestError,
    doGetPropertybyid,
    property,
    Propertyfeature,
    propertyImage
});

// view property features Added propertyt
const getFeatures = controller.getFeatures({
    BadRequestError,
    doGetPropertyFeatures,
    Type,
    Features
});

// view property floor plan
// const getPropertyfloorplan = controller.getPropertyfloorplan({
//     BadRequestError,
//     doGetPropertyfloorplan,
//     propertyImage
// });


const getresentpropertyadd = controller.getresentpropertyadd({
    BadRequestError,
    dogetresentproperty,
    property
});

const getpropertybycustomer = controller.getpropertybycustomer({
    BadRequestError,
    dogetpropertybycustum,
    property,

});

// View Property face
const getFace = controller.getFace({
    BadRequestError,
    doGetPropertyFace,
    Facing

})





const AllpropertyController = {
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
    // getPropertyfloorplan
};

// routes
const routes = require("../../frontend/property/property.routes")({
    AllpropertyController,
    router,
    makeExpressCallback,
});

module.exports = {
    AllpropertyController,
    AllpropertyService: {

        doGetAllproperty,
        doGetAllproject,
        doGetAllrentproperties,
        doGetRecentprojects,
        doGetRentprojects,
        doGetResidential,
        doGetCommercial,
        doGetResidentialPlot,
        doGetCommercialLand,
        doGetResidentialHouse,
        doGetCommercialShop,
        dogetpropertyTypes,
        doProperty,
        doFeaturesproperty,
        dogetresentproperty,
        getpropertybycustomer,
        doPropertyImg,
        doPropertyfeatures,
        doGetPropertyFeatures,
        doUpdateProperty,
        doGetPropertybyid,
        doUpdatePropertyImg,
        doUpdatePropertyfeatures,
        doFeatureimage,
        doPropertyFloorImg,
        dogetpropertyType,
        doGetpostbuyagnet,
        doGetPropertyFace
        // doGetPropertyfloorplan



    },
    ClintAllpropertyRoutes: routes,
};
