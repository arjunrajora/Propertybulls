const router = require('express').Router();

const {
    // doGenerateSignedUrl,
    doUploadProfile,
    // doUploadDocuments,
} = require('./file-upload.service');

const { superAdminTemplate } = require('../utils/email-templates');
const emailTransporter = require('../utils/email');
const sendGridTransporter = require('../utils/sendgrid');
const { User } = require('../db');
const { validateFileName } = require('./file-upload.validator');

const makeExpressCallback = require('../utils/express-callback');

const { BadRequestError } = require('../utils/api-errors');

// controller
const controller = require('./file-upload.controller');

// const generateSignedUrl = controller.generateSignedUrl({
//     BadRequestError,
//     doGenerateSignedUrl,
//     validateFileName,
//     User,
// });
const uploadProfile = controller.uploadProfile({
    User,
    doUploadProfile,
    BadRequestError,
    validateFileName,
});
// const uploadTeacherDocuments = controller.uploadTeacherDocuments({
//     Teacher,
//     User,
//     doUploadDocuments,
//     BadRequestError,
//     validateFileName,
//     superAdminTemplate,
//     emailTransporter,
//     sendGridTransporter,
// });

const FileUploadController = {
    // generateSignedUrl,
    uploadProfile,
    // uploadTeacherDocuments,
};

// routes
const routes = require('./file-upload.routes')({
    FileUploadController,
    router,
    makeExpressCallback,
});

module.exports = {
    FileUploadController,
    FileUploadService: {
        // doGenerateSignedUrl,
        doUploadProfile,
        // doUploadDocuments,
    },
    FileUploadRoutes: routes,
};
