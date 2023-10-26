const fileUpload = require("../middlewares/fileUpload");
module.exports=({
    StaticController,
    router,
    makeExpressCallback,

})=>{
router.post('/add',fileUpload.imageUpload.single("image"),makeExpressCallback(StaticController.staticAdd));
    //  router.post ('/add',makeExpressCallback(StaticController.staticAdd))
    router.get('/viewAll',makeExpressCallback(StaticController.getStatic));
    router.delete('/:id',makeExpressCallback(StaticController.deleteStatic));
    // router.put('/:id',makeExpressCallback(StaticController.updateStatic))
    router.put('/:id',fileUpload.imageUpload.single("image"),makeExpressCallback(StaticController.updateStatic));

    router.get('/:id',makeExpressCallback(StaticController.getStaticById))
    router.put('/status/:id', makeExpressCallback(StaticController.updateStaticStatus));



    return router;
}