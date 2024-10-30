const PublicController = require('../features/public/public.controller');
const { validateContactUs, validateQuoteCalculation } = require('../shared/middleware/validator-middleware');
const asyncWrapper = require('../shared/util/base');

const registerPublicRoutes = (app) => {
    app.post('/contact', validateContactUs, asyncWrapper(PublicController.contactUs));

    app.get('/calc/:buildingType', validateQuoteCalculation, asyncWrapper(PublicController.calculateQuote));
};

module.exports = { registerPublicRoutes };
