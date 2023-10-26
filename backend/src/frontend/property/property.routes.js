
const fileUpload = require("../../middlewares/fileUpload");


module.exports = ({
    AllpropertyController,
    router,
    makeExpressCallback,
}) => {



    router.get('/viwpostbyagent', makeExpressCallback(AllpropertyController.getPostedByAgent));
    router.post('/add', makeExpressCallback(AllpropertyController.propertyAdd));
    router.get('/Allproperty', makeExpressCallback(AllpropertyController.getAllproperty));
    router.get('/Allproject', makeExpressCallback(AllpropertyController.getAllproject));
    router.get('/Allrentproperties', makeExpressCallback(AllpropertyController.getAllrentproperties));
    router.get('/Recentproject', makeExpressCallback(AllpropertyController.getRecentprojects));
    router.get('/Rentprojects', makeExpressCallback(AllpropertyController.getRentprojects));
    router.get('/Residential', makeExpressCallback(AllpropertyController.getResidential));
    router.get('/Commercial', makeExpressCallback(AllpropertyController.getCommercial));
    router.get('/ResidentialPlot', makeExpressCallback(AllpropertyController.getResidentialPlot));
    router.get('/CommercialLand', makeExpressCallback(AllpropertyController.getCommercialLand));
    router.get('/ResidentialHouse', makeExpressCallback(AllpropertyController.getResidentialHouse));
    router.get('/CommercialShop', makeExpressCallback(AllpropertyController.getCommercialShop));
    router.post('/resentproperty', makeExpressCallback(AllpropertyController.getresentpropertyadd));
    router.post('/viewpropertybyuser', makeExpressCallback(AllpropertyController.getpropertybycustomer));
    router.post('/viewPropertytype', makeExpressCallback(AllpropertyController.getPropertytypes));
    router.get('/viewAllPropertytypes', makeExpressCallback(AllpropertyController.getPropertytype));
    router.get('/viewPropertyface', makeExpressCallback(AllpropertyController.getFace));


    // router.post('/featurespropertyAdd', fileUpload.upload.array('img', 6), makeExpressCallback(AllpropertyController.featurespropertyAdd));
    router.post('/featurespropertyAdd', fileUpload.upload.fields([{ name: 'img' }, { name: 'featureimage' }, { name: 'floor_img' }]), makeExpressCallback(AllpropertyController.featurespropertyAdd));
    router.get('/ViewPropertyFeatures', makeExpressCallback(AllpropertyController.getFeatures));
    // router.put('/:id',  makeExpressCallback(AllpropertyController.updateProperty));
    router.put('/:id', fileUpload.imageUpload.fields([{ name: 'img' }, { name: 'featureimage' }, { name: 'floor_img' }]), makeExpressCallback(AllpropertyController.updateProperty));
    // propertyview by id
    router.get('/propertyes/:id', makeExpressCallback(AllpropertyController.getPropertybyid));
    // property floor plan view
    // router.get('/floorplan/:id', makeExpressCallback(AllpropertyController.getPropertyfloorplan));


    return router;
};
