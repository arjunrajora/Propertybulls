const fileUpload = require("../../middlewares/fileUpload");

module.exports = ({
  savesearchController, 
  router,
  makeExpressCallback,
}) => {

  router.post('/add',makeExpressCallback(savesearchController.addSave));
  router.post('/id',makeExpressCallback(savesearchController.getsavesearchById));
  router.delete('/:id',makeExpressCallback(savesearchController.DeleteSaveSearch));


  return router;
};
