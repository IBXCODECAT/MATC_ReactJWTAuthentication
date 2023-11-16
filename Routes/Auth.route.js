const { error } = require('@hapi/joi/lib/base');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

require('@hapi/joi');

const { authSchema } = require('../Helpers/validation_schema');


const { signAcessToken } = require('../Helpers/JWT_helper');
const { UserModel } = require('../Models/User.model');

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
        const doesExist = await UserModel.findOne({email: email});
        if(doesExist) throw createError.Conflict(`${email} is already been registered`);

        //Create a new user
        const user = new UserModel({email, password});
        const savedUser = await user.save();

        //Generate JWT token and send it to the user
        const acessToken = await signAcessToken(savedUser.id);
        res.send({acessToken});
    } catch (err) {
        console.error(err);
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