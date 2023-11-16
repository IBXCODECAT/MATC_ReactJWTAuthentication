const { error } = require('@hapi/joi/lib/base');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

require('@hapi/joi');

const { authSchema } = require('../Helpers/validation_schema');

const User = require('../Models/User.model');

router.post('/register', async(req, res, next) => {
    try {
        //Get user input
        const {email, password} = req.body;

        //Validate the request body
        const result = await authSchema.validateAsync(req.body);
        console.log(result);

        //Registration body must contain an email and a password
        if(!email || !password) throw createError.BadRequest();

        //Check if the email is already been registered
        const doesExist = await User.User.findOne({email: email});
        if(doesExist) return createError.Conflict(`${email} is already been registered`);

        //Create a new user
        const user = new User.User({email, password});
        const savedUser = await user.save();
        res.send(savedUser);
    } catch {
        //422 = Unprocessable content
        if(error.isJoi === true) error.status = 422;
        next(error);
    }
});

router.post('/login', async(req, res, next) => {
    res.send('login');
});

router.post('/refresh-token', async(req, res, next) => {
    res.send('refresh token route');
});

router.delete('/logout', async(req, res, next) => {
    res.send('logout route');
});

module.exports = router;