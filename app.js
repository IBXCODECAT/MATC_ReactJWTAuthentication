const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

require('./Helpers/mongodb');
const authRoute = require('./Routes/auth.route');

const { signAcessToken, verifyAccessToken } = require('../Helpers/JWT');

const app = express();

//Morgan in dev mode
app.use(morgan('dev'));

//Parse JSON data from request body
app.use(express.json());

//Parse urlencoded data from request
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);

//This is a standard unprotected route
app.get('/', async (req, res, next) => {
    res.send("Pong!");
});

//This is a protected route that requires a valid JWT token to access it
app.get('/protected-route', verifyAccessToken, async (req, res, next) => {
    console.log(req.headers['authorization']);

    res.send("Hello from protected route!");
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