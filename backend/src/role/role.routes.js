module.exports =({
    RoleController,
    router,
    makeExpressCallback,
})=>{

  router.get('/viewAll', makeExpressCallback(RoleController.getRole))

return router;

}