// api/index.js
const serverless = require('serverless-http');
const app = require('../dist/app').default;  // point to compiled JS in dist/

module.exports = serverless(app);
