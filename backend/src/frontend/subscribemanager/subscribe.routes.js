module.exports = ({
  SubscribeController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(SubscribeController.subscribeAdd));
  router.get('/subscription', makeExpressCallback(SubscribeController.getSubscription));
  router.post('/BuyNow', makeExpressCallback(SubscribeController.orderNow));
  router.post('/confirmation', makeExpressCallback(SubscribeController.getSubscriptionconfirmation));
  router.put('/CreateOrder', makeExpressCallback(SubscribeController.updateOrder));
  router.post('/getRazorpay', makeExpressCallback(SubscribeController.getRazorpayid));
  router.post('/mypackage', makeExpressCallback(SubscribeController.getSubscriptionconPackage));


  return router;
};
