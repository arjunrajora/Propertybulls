module.exports = ({
  AgentController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add', makeExpressCallback(AgentController.addAgent));
  router.delete('/:id', makeExpressCallback(AgentController.deleteAgent));
  router.get('/viewAll', makeExpressCallback(AgentController.getAgent))
  router.put('/:id', makeExpressCallback(AgentController.updateAgent));
  router.put('/status/:id', makeExpressCallback(AgentController.status));
  router.get('/:id', makeExpressCallback(AgentController.getAgentById));
  router.post('/serchviewAll', makeExpressCallback(AgentController.searchAgent))
  router.get('/Property/:id', makeExpressCallback(AgentController.getProperty));

  return router;
};
