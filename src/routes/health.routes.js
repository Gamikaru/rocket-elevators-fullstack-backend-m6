const HealthController = require('../features/health/health.controller');
const asyncWrapper = require('../shared/util/base');

const registerHealthRoutes = (app) => {
    app.get('/hello', asyncWrapper(HealthController.helloWorld));
    app.get('/status', asyncWrapper(HealthController.status));
    app.get('/error', asyncWrapper(HealthController.error));
};

module.exports = { registerHealthRoutes };
