// Load environment variables from .env file
require('dotenv').config();

// Import the Express framework and create an instance of it
const Express = require('express');
const app = Express();

// Import the cors package to enable CORS with various options
const cors = require('cors');
app.use(cors());

// Set the port for the server to listen on, either from an environment variable or default to 3004
const port = process.env.PORT || 3004;

// Import database management utilities for MongoDB
const MongoManager = require('./src/shared/db/mongodb/mongo-manager');

// Import middleware configurations
const MiddleWare = require('./src/shared/middleware/base-middleware');

// Import route definitions
const HealthRoutes = require('./src/routes/health.routes');
const AdminRoutes = require('./src/routes/admin.routes');
const PublicRoutes = require('./src/routes/public.routes');
const AgentRoutes = require('./src/routes/agent.routes');
const RegionRoutes = require('./src/routes/region.routes'); // Updated variable name

// Serve static files (like HTML, CSS, and JavaScript) from the './src/public' directory
app.use(Express.static('./src/public'));

// In app.js, after all routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Use built-in middleware for parsing JSON payloads
app.use(Express.json());

// Register base middleware for common functionality across all routes
MiddleWare.registerBaseMiddleWare(app);

// Register route handlers
HealthRoutes.registerHealthRoutes(app);
AdminRoutes.registerAdminRoutes(app);
PublicRoutes.registerPublicRoutes(app);
AgentRoutes.registerAgentRoutes(app);
RegionRoutes.registerRegionRoutes(app); // Updated function call

// Establish a connection to the MongoDB database
MongoManager.openMongoConnection();

// Start the server and listen for incoming connections on the designated port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
