const AgentController = require('../features/agent/agent.controller');
const { validateRegion } = require('../shared/middleware/validator-middleware');
const asyncWrapper = require('../shared/util/base');

const registerAgentRoutes = (app) => {
    app.post('/agent-create', asyncWrapper(AgentController.createAgent));

    app.get('/agents', asyncWrapper(AgentController.getAllAgents));

    app.get('/agents-by-region', validateRegion, asyncWrapper(AgentController.getAgentsByRegion));

    app.post('/agent-update-info/:id', asyncWrapper(AgentController.updateAgentInfo));

    app.post('/agent-delete/:id', asyncWrapper(AgentController.deleteAgent));
};

module.exports = { registerAgentRoutes };
