const ResponseUtil = require('../../shared/util/response').ResponseUtil;
require('dotenv').config();
const port = process.env.PORT || 3004;

const helloWorld = async (req, res) => {
    ResponseUtil.respondOk(res, null, 'Hello World');
};

const status = async (req, res) => {
    const envName = process.env.ENV_NAME || 'development'; // Set default value
    const message = `Environment '${envName}' running on port: ${port}`;
    ResponseUtil.respondOk(res, null, message);
};

const error = async (req, res) => {
    ResponseUtil.respondError(res, null, 'An error occurred');
};

module.exports = { helloWorld, status, error };
