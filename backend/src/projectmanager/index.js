const router = require("express").Router();

const { Project, Builder,propertydetails, Propertydetail, Propertyfeature,propertyTypes,Location,
    propertyImage, } = require("../db");


const {
    doProject,
    doGetProject,
    doDeleteProject,
    doUpdateProject,
    // doGetProjectById,
    doUpdateProjectStatus,
    doSearchProject,
    doProjectImg,
    doPropertyfeatures,
    dogetProjectImgbyid,
    doGetProjectbyid,
    doUpdatePropertyfeatures,
    doUpdatePropertyImg,
    doUpdateFeatured,
    doProjectDetail,
    doDeleteprojectimg,
    doUpdateProjectDetail,
    doUpdatefeatured_gallery

} = require("./project.service");


const {
    validateUpdateStatus

} = require("./project.validator");
const makeExpressCallback = require("../utils/express-callback");

const { BadRequestError } = require("../utils/api-errors");
// controller
const controller = require("./project.controller");
const projectAdd = controller.projectAdd({
    BadRequestError,
    doProject,
    Project,
    Propertydetail,
    doProjectImg,
    propertyImage,
    propertydetails,
    doPropertyfeatures,
    Propertyfeature,
    doProjectDetail
});

const getProject = controller.getProject({
    BadRequestError,
    doGetProject,
    Project,
    Builder,
    propertyTypes,
    Location,
    propertydetails,


});
const getProjectimgbyid = controller.getProjectimgbyid({
    BadRequestError,
    dogetProjectImgbyid,
    propertyImage
});


const GetProjectbyid = controller.GetProjectbyid({
    BadRequestError,
    doGetProjectbyid,
    Project,
    Builder,
    propertyTypes,
    Location,
    propertyImage,
    Propertyfeature,
    propertydetails
});

const updateFeatured = controller.updateFeatured({
    BadRequestError,
    Project,
    doUpdateFeatured,
    // validateUpdateFeatured
  });
  


  const updatefeatured_gallery = controller.updatefeatured_gallery({
    BadRequestError,
    Project,
    doUpdatefeatured_gallery,
    // validateUpdateFeatured
  });
  


const deleteProject = controller.deleteProject({
    BadRequestError,
    doDeleteProject,
});

const deleteProjectimg = controller.deleteProjectimg({
    BadRequestError,
    doDeleteprojectimg,
});



const updateProject = controller.updateProject({
    BadRequestError,
    doUpdateProject,
    doUpdateProjectDetail,
    Project,
    doUpdatePropertyfeatures,
    doUpdatePropertyImg,
    Propertyfeature,
    propertyImage,
    propertydetails
});

const searchProject = controller.searchProject({
    BadRequestError,
    Project,
    Builder,
    propertyTypes,
    Location,
    propertyImage,
    doSearchProject,
});

// Added Features Property
const featurespropertyAdd = controller.featurespropertyAdd({
    BadRequestError,
    doProjectImg,
    doPropertyfeatures,
    Propertyfeature,
    propertyImage,

});



const updateProjectStatus = controller.updateProjectStatus({
    BadRequestError,
    Project,
    doUpdateProjectStatus,
    validateUpdateStatus,
});



const ProjectController = {
    projectAdd,
    getProject,
    deleteProject,
    updateProject,
    updateProjectStatus,
    searchProject,
    featurespropertyAdd,
    getProjectimgbyid,
    GetProjectbyid,
    updateFeatured,deleteProjectimg,
    updatefeatured_gallery
};

// routes
const routes = require("./project.routes")({
    ProjectController,
    router,
    makeExpressCallback,
});

module.exports = {
    ProjectController,
    ProjectService: {
        doProject,
        doGetProject,
        doDeleteProject,
        doUpdateProject,
        doUpdateProjectStatus,
        doSearchProject,
        doProjectImg,
        doPropertyfeatures,
        dogetProjectImgbyid,
        doGetProjectbyid,
        doUpdatePropertyfeatures,
        doUpdatePropertyImg,
        doUpdateFeatured,
        doProjectDetail,
        doDeleteprojectimg,
        doUpdateProjectDetail,
        doUpdatefeatured_gallery
    },
    ProjectRoutes: routes,
};
