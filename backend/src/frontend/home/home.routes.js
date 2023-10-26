module.exports = ({
    SliderController,
    router,
    makeExpressCallback,
}) => {

    router.get('/viewAll', makeExpressCallback(SliderController.getSlider));
    router.get('/viewAlldata', makeExpressCallback(SliderController.getdataHome));
    router.get('/viewAllProjectMonth', makeExpressCallback(SliderController.getProject));
    router.get('/viewAllProjectGallery', makeExpressCallback(SliderController.getProjectgallery));
    router.get('/viewAllAssociateBuilder', makeExpressCallback(SliderController.getBuilder));
    router.get('/viewAllArticle', makeExpressCallback(SliderController.getArticle));
    router.get('/viewAllProperty', makeExpressCallback(SliderController.getProperty));
    router.get('/viewLocation', makeExpressCallback(SliderController.getLocation));
    router.get('/viewpropertytypes', makeExpressCallback(SliderController.getPropertytypes));
    router.post('/search', makeExpressCallback(SliderController.searchProperty));


    return router;
};
