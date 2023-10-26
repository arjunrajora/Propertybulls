const router = require('express').Router();
const { Agent,Location,property,propertyTypes,Facing,Responses,Requirement } = require('../db');
const makeExpressCallback = require('../utils/express-callback');
const { BadRequestError } = require('../utils/api-errors');
// controller
const controller = require('./agent.controller');
const {
  validateAgentCreateData,
  validateAgentUpdateData,
  validateAgentStatus
} = require('./agent.validator');
const {
  doAgent,
  doCheckUserExist,
  doGetAgent,
  doUpdateAgent,
  doDeleteAgent,
  doGetAgentById,
  doStatus,
  doSearchAgent,
  doGetProperty,
  doCheckPropertyByagent
} = require('./agent.service');

const addAgent = controller.addAgent({
  BadRequestError,
  doAgent,
  doCheckUserExist,
  validateAgentCreateData
});
const getAgent = controller.getAgent({
  BadRequestError,
  doGetAgent,
  Agent,
  Location,
  property,
  Requirement
});
const updateAgent = controller.updateAgent({
  BadRequestError,
  Agent,
  validateAgentUpdateData,
  doUpdateAgent,
  doCheckUserExist
});
const deleteAgent = controller.deleteAgent({
  BadRequestError,
  doDeleteAgent,
  doCheckPropertyByagent,
  property
});
const getAgentById = controller.getAgentById({
  BadRequestError,
  doGetAgentById,
  Agent
});
const status = controller.status({
  BadRequestError,
  doStatus,
  Agent,
  validateAgentStatus
});
const searchAgent = controller.searchAgent({
  BadRequestError,
  doSearchAgent,
  Agent,
  Location,
  property
});
const getProperty = controller.getProperty({
  BadRequestError,
  doGetProperty,
  Agent,
  property,
  Location,
  propertyTypes,
  Facing,
  Responses
});

const AgentController = {
  addAgent,
  getAgent,
  updateAgent,
  deleteAgent, 
  getAgentById,
  status,
  searchAgent,
  getProperty
};

// routes
const routes = require('./agent.routes')({
  AgentController,
  router,
  makeExpressCallback,
});

module.exports = {
  AgentController,
  AgentService: {
    doAgent,
    doCheckUserExist,
    doGetAgent,
    doUpdateAgent,
    doDeleteAgent,
    doGetAgentById,
    doStatus,
    doSearchAgent,
    doGetProperty
  },
  AgentRoutes: routes, 
}; 
