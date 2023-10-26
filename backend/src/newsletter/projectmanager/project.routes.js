const fileUpload = require("../middlewares/fileUpload");


module.exports = ({
    ProjectController,
    router,
    makeExpressCallback,
}) => {

    router.post('/add', makeExpressCallback(ProjectController.projectAdd));
    router.get('/viewAll', makeExpressCallback(ProjectController.getProject));
    router.delete('/:id', makeExpressCallback(ProjectController.deleteProject));
    router.put('/:id', makeExpressCallback(ProjectController.updateProject));
    router.put('/status/:id', makeExpressCallback(ProjectController.updateProjectStatus));
    router.post('/search', makeExpressCallback(ProjectController.searchProject))
    router.post('/featurespropertyAdd', fileUpload.imageUpload.single('img'), makeExpressCallback(ProjectController.featurespropertyAdd));


    return router;
};
