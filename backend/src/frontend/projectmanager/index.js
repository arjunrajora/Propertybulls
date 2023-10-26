const router = require("express").Router();

const { Project, User,Features,Builder,Propertydetail, propertydetails, Propertyfeature, Location,propertyTypes,Property,SaveOrder,
    propertyImage, } = require("../../db");


const {
    doProject,
    doGetProject,
    doDeleteProject,
    doUpdateProject,
    // doGetProjectById,
    doUpdateProjectStatus,
    doSearchProject,
    doPropertyImg,
    doPropertyfeatures,
    doDeletePropertyfeatures,
    doDeletePropertyImg,
    doGetProjectbuyid,
    doProjectDetail,
    doUpdatePropertyfeatures,
    doUpdatePropertyImg,
    doUpdateProjectDetail,
    doDeletefloorimg,
    doCheckProjectbyApproved,
    doGetProjectdetailByUrl,
        doGetAllproperty,
        doUpdateFeatured_post,
        docheckpakagebyuser
} = require("./project.service");


const {
    validateUpdateStatus

} = require("./project.validator");
const makeExpressCallback = require("../../utils/express-callback");

const { BadRequestError } = require("../../utils/api-errors");
// controller
const controller = require("./project.controller");
const projectAdd = controller.projectAdd({
    BadRequestError,
    doProject,
    Project,
    Propertydetail,
    doPropertyImg,
    propertyImage,
    doProjectDetail
});

const getProject = controller.getProject({
    BadRequestError,
    doGetAllproperty,
    Project,
   propertyTypes,
   Location
});
const getpakagebyuser = controller.getpakagebyuser({
    BadRequestError,
    docheckpakagebyuser,
    SaveOrder,Project
});


const deleteFloorimg = controller.deleteFloorimg({
    BadRequestError,
    doDeletefloorimg
});



const getProjectdetailByUrl = controller.getProjectdetailByUrl({
    BadRequestError,
    doGetProjectdetailByUrl,
    Project,
    propertyTypes,
    propertyImage,
     propertydetails, 
     Propertyfeature,
     Builder,
     Features
  });


const getProjectbuyid = controller.getProjectbuyid({
    BadRequestError,
    doGetProjectbuyid,
    propertyImage,
    Propertyfeature,
    propertydetails,
    propertyTypes
});


const deleteProject = controller.deleteProject({
    BadRequestError,
    doDeleteProject,
    doDeletePropertyfeatures,
    doDeletePropertyImg,
    Propertyfeature,
    propertyImage,
    Project,
    doCheckProjectbyApproved
});
const updateProject = controller.updateProject({
    BadRequestError,
    doUpdateProject,
    Project,
    doUpdatePropertyfeatures,
    doUpdatePropertyImg,
    doUpdateProjectDetail,
    Propertyfeature,
    propertyImage,
    Propertydetail
});

const searchProject = controller.searchProject({
    BadRequestError,
    Project,
    doSearchProject,
});

// Added Features Property
const featurespropertyAdd = controller.featurespropertyAdd({
    BadRequestError,
    doPropertyImg,
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


const UpdateProjectFeatured_post = controller.UpdateProjectFeatured_post({
    BadRequestError,
    Project,
    doUpdateFeatured_post,
    doCheckProjectbyApproved
});

const ProjectController = {
    projectAdd,
    getProject,
    deleteProject,
    updateProject,
    updateProjectStatus,
    searchProject,
    featurespropertyAdd,
    getProjectbuyid,
    deleteFloorimg,
    getProjectdetailByUrl,
    UpdateProjectFeatured_post,
    getpakagebyuser

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
        doPropertyImg,
        doPropertyfeatures,
        doDeletePropertyfeatures,
        doDeletePropertyImg,
        doGetProjectbuyid,
        doProjectDetail,
        doUpdateProjectDetail,
        doDeletefloorimg,
        doCheckProjectbyApproved,
        doGetProjectdetailByUrl,
        doUpdateFeatured_post,
        docheckpakagebyuser
        },
    ProjectManagerRoutes: routes,
};
