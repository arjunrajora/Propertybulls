const router = require("express").Router();

const { Project, Builder, Propertydetail, Propertyfeature,
    propertyImage, } = require("../db");


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
    Propertydetail

});

const getProject = controller.getProject({
    BadRequestError,
    doGetProject,
    Project,
    Builder

});

const deleteProject = controller.deleteProject({
    BadRequestError,
    doDeleteProject,
});
const updateProject = controller.updateProject({
    BadRequestError,
    doUpdateProject,
    Project,

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



const ProjectController = {
    projectAdd,
    getProject,
    deleteProject,
    updateProject,
    updateProjectStatus,
    searchProject,
    featurespropertyAdd

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
    },
    ProjectRoutes: routes,
};
