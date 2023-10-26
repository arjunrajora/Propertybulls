const fileUpload = require("../middlewares/fileUpload");

module.exports = ({
  VisibilityMatrixController, 
  router,
  makeExpressCallback,
}) => {

  router.post('/add',makeExpressCallback(VisibilityMatrixController.addVisibilityMatrix));
  router.get('/viewAll',makeExpressCallback(VisibilityMatrixController.getVisibilityMatrix));

  return router;
};
