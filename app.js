const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

const app = express();

app.get('/', async (req, res, next) => {
    res.send('hello');
});

app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exist on the server.'));
});

app.use(async (err, req, res, next) => {
    res.status = err.status || 500;
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        
        },
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});