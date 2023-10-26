const fileUpload = require("../../middlewares/fileUpload");


module.exports = ({
    ProjectController,
    router,
    makeExpressCallback,
}) => {

    router.get('/viewAll', makeExpressCallback(ProjectController.getProject));
    router.get('/:id', makeExpressCallback(ProjectController.getProjectbuyid));
    router.delete('/delete/:id', makeExpressCallback(ProjectController.deleteProject));
    router.delete('/deleteFloorimg/:id', makeExpressCallback(ProjectController.deleteFloorimg));
    router.put('/:id', fileUpload.imageUpload.fields([{ name: 'img'},
    { name: 'featureimage' },
    { name: 'floor_img' }
]), makeExpressCallback(ProjectController.updateProject));
        router.put('/status/:id', makeExpressCallback(ProjectController.updateProjectStatus));
        router.put('/featuredpost/:id', makeExpressCallback(ProjectController.UpdateProjectFeatured_post));
    router.post('/search', makeExpressCallback(ProjectController.searchProject))
    router.post('/featurespropertyAdd', fileUpload.imageUpload.array('floor_img'), makeExpressCallback(ProjectController.projectAdd));

    router.get('/url/:url', makeExpressCallback(ProjectController.getProjectdetailByUrl))
    router.post('/pakage/pakage', makeExpressCallback(ProjectController.getpakagebyuser))

    return router;
};
