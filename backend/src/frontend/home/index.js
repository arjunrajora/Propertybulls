const router = require("express").Router();
const { Slider, Project, User, Location, propertyTypes,SaveOrder,VisibilityMatrix,
    Subscription } = require("../../db");
const makeExpressCallback = require('../../utils/express-callback');
const { BadRequestError } = require('../../utils/api-errors')


const {
    doGetSlider,
    doGetProject,
    doGetProjectgallery,
    doGetBuilder,
    doGetArticle,
    doSearchProperty,
    doGetProperty,
    doGetLocation,
    doGetPropertytypes,
    doGethomeDate
} = require("./home.service");



// controller
const controller = require("./home.controller");

// Slider
const getSlider = controller.getSlider({
    BadRequestError,
    doGetSlider,
    Slider
});


const getdataHome = controller.getdataHome({
    BadRequestError,
    doGethomeDate,
    doGetProject,
    doGetProjectgallery,
    doGetBuilder,
    doGetArticle
});
// Project of the month
const getProject = controller.getProject({
    BadRequestError,
    doGetProject,
    Project
});

// Project Gallery
const getProjectgallery = controller.getProjectgallery({
    BadRequestError,
    doGetProjectgallery,
    // Project
});

// Associate  Builder
const getBuilder = controller.getBuilder({
    BadRequestError,
    doGetBuilder,

});

//View Article
const getArticle = controller.getArticle({
    BadRequestError,
    doGetArticle,

});



// Search

const searchProperty = controller.searchProperty({
    BadRequestError,
    doSearchProperty,
    User,
    Location,
    propertyTypes,SaveOrder,
    Subscription,
    VisibilityMatrix
});

// view all property 
const getProperty = controller.getProperty({
    BadRequestError,
    doGetProperty,

});

// view all Location 
const getLocation = controller.getLocation({
    BadRequestError,
    doGetLocation,

});
// view all Propertytypes 
const getPropertytypes = controller.getPropertytypes({
    BadRequestError,
    doGetPropertytypes,

});



const SliderController = {
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

// routes
const routes = require("./home.routes")({
    SliderController,
    router,
    makeExpressCallback,
});

module.exports = {
    SliderController,
    SliderService: {
        doGetSlider,
        doGetProject,
        doGetProjectgallery,
        doGetBuilder,
        doGetArticle,
        doSearchProperty,
        doGetProperty,
        doGetLocation,
        doGetPropertytypes,
        doGethomeDate

    },
    ClintHomeRoutes: routes,
};
