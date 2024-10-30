const AdminController = require('../features/admin/admin.controller');
const asyncWrapper = require('../shared/util/base');

const registerAdminRoutes = (app) => {
    app.get('/email-list', asyncWrapper(AdminController.emailList));

    app.get('/region-avg', asyncWrapper(AdminController.regionAverage));
};

module.exports = { registerAdminRoutes };
