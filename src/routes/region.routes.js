const RegionController = require('../features/region/region.controller');
const asyncWrapper = require('../shared/util/base');

const registerRegionRoutes = (app) => {
    app.post('/region-create', asyncWrapper(RegionController.createRegion));
    app.get('/region', asyncWrapper(RegionController.getRegion));
    app.get('/all-stars', asyncWrapper(RegionController.getAllStars));
};

module.exports = { registerRegionRoutes };
