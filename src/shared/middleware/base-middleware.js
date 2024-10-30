require('dotenv').config();

const adminRoutes = [
    '/email-list',
    '/region-avg',
    '/calc-residential'
];

const registerBaseMiddleWare = (app) => {
    app.use(logger);
    app.use(checkAuthToken);
};

const logger = (req, res, next) => {
    const message = `API call: ${req.method} on ${req.originalUrl} at ${new Date()}`;
    console.log(message);
    next();
};

const checkAuthToken = (req, res, next) => {
    const url = req.url.split('?')[0]; // Updated to handle URLs without query parameters

    if (!adminRoutes.includes(url)) {
        next();
        return;
    }

    const inputToken = req.headers.token;
    const savedToken = process.env.ACCESS_TOKEN; // Updated variable name

    if (inputToken !== savedToken) {
        res.status(401).send('Unauthorized');
        return;
    }
    next();
};

module.exports = { registerBaseMiddleWare };
