// Vercel serverless function entry point
const app = require('../server');

// Export handler that ensures DB connection
module.exports = async (req, res) => {
    // Let Express handle the request
    return app(req, res);
};
