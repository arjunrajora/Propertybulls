module.exports = ({
  SubscriptionController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(SubscriptionController.subscriptionAdd));
  router.get('/viewAll', makeExpressCallback(SubscriptionController.getSubscription));
  // router.get('/viewState', makeExpressCallback(CityController.getState));

  router.delete('/delete/:id', makeExpressCallback(SubscriptionController.deleteSubscription));
  router.put('/update/:id', makeExpressCallback(SubscriptionController.updateSubscription));
  router.get('/:id', makeExpressCallback(SubscriptionController.getSubscriptionById));
  router.get('/Subscriptions/View', makeExpressCallback(SubscriptionController.getSubscriptionPackage));
  router.get('/roles/View', makeExpressCallback(SubscriptionController.getRole));
  router.post('/search', makeExpressCallback(SubscriptionController.searchSubscription));

  // router.post('/search', makeExpressCallback(CityController.searchCity))

  return router;
};
