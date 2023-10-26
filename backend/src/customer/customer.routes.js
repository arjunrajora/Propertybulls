
const fileUpload = require("../middlewares/fileUpload");
module.exports = ({
  CustomerController,
  router,
  makeExpressCallback,
}) => {


  // router.post('/add', makeExpressCallback(CustomerController.customerAdd));
  router.post('/add', fileUpload.imageUpload.single("image"), makeExpressCallback(CustomerController.customerAdd));
  router.get('/viewAll', makeExpressCallback(CustomerController.getCustomer));
  router.delete('/:id', makeExpressCallback(CustomerController.deleteCustomer));
  // router.put('/:id',makeExpressCallback(CustomerController.updateCustomer));
  router.put('/:id', fileUpload.imageUpload.single("image"), makeExpressCallback(CustomerController.updateCustomer));

  router.put('/status/:id', makeExpressCallback(CustomerController.StatusCustomer));
  router.post('/search', makeExpressCallback(CustomerController.searchCustomer));

  router.get('/:id', makeExpressCallback(CustomerController.getCustomerbyid));

  // Requirement Added view
  router.get('/requirement/:id', makeExpressCallback(CustomerController.getCustomerRequirmentbyid));
  router.get('/detail/:id', makeExpressCallback(CustomerController.getCustomerdetailbyid));




  return router;
};
