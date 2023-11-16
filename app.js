const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

require('./Helpers/init_mongodb');
const authRoute = require('./Routes/auth.route');

const app = express();

//Morgan in dev mode
app.use(morgan('dev'));

app.use('/auth', authRoute);


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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});