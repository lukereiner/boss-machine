const express = require('express');
const app = express();

module.exports = app;

// Add middleware for handling CORS requests from index.html
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Add middware for parsing request bodies here:
const cors = require('cors')
app.use(cors());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');

app.use('/api', apiRouter);