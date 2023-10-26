const fileUpload = require("../middlewares/fileUpload");


module.exports = ({
    ProjectController,
    router,
    makeExpressCallback,
}) => {
    router.get('/viewAll', makeExpressCallback(ProjectController.getProject));
    router.delete('/:id', makeExpressCallback(ProjectController.deleteProject));
    router.get('/:id', makeExpressCallback(ProjectController.GetProjectbyid));
    router.put('/:id', fileUpload.imageUpload.fields([{ name: 'img'},
    { name: 'floor_img'},{ name: 'featureimage' }]), makeExpressCallback(ProjectController.updateProject));
    router.put('/status/:id', makeExpressCallback(ProjectController.updateProjectStatus));
    router.post('/search', makeExpressCallback(ProjectController.searchProject))
    router.post('/projectimg', makeExpressCallback(ProjectController.getProjectimgbyid))
    router.post('/projectadd', fileUpload.imageUpload.fields([
{ name: 'img'},   { name: 'floor_img'},{ name: 'featureimage' } ]), makeExpressCallback(ProjectController.projectAdd));
 router.put('/featured/:id', makeExpressCallback(ProjectController.updateFeatured));
 router.put('/featured_gallery/:id', makeExpressCallback(ProjectController.updatefeatured_gallery));
 router.delete('/deleteprojectimg/:id', makeExpressCallback(ProjectController.deleteProjectimg));

 return router;
};
