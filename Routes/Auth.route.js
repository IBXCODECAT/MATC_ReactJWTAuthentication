const { error } = require('@hapi/joi/lib/base');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

require('@hapi/joi');

const { authSchema } = require('../Helpers/validation');


const { signAcessToken, signRefreshToken, verifyRefreshToken } = require('../Helpers/JWT');
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

        //Generate JWT tokens and send them to the user
        const acessToken = await signAcessToken(savedUser.id);
        const refreshTtoken = await signRefreshToken(savedUser.id);
        res.send({acess_token: acessToken, refresh_token: refreshTtoken}).status(201);
    } catch (err) {
        console.error(err);
        //422 = Unprocessable content
        if(err.isJoi === true) err.status = 422;
        next(err);
    }
});

router.post('/login', async(req, res, next) => {
    try {
        //Validate the request body
        const result = await authSchema.validateAsync(req.body);

        //Check if the email is already been registered
        const user = UserModel.findOne({email: result.email});
        if(!user) throw createError.NotFound("User not registered");

        //Check if the password is correct
        const isPasswordMatch = await UserModel.isValidPassword(result.password);
        if(!isPasswordMatch) throw createError.Unauthorized("Unauthorized");

        //Generate JWT tokens and send them to the user
        const accessToken = await signAcessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);
        res.send({access_token: accessToken, refresh_token: refreshToken});
    } catch(err) {

        //422 = Unprocessable Content
        if(err.isJoi === true) return next(createError.UnprocessableEntity("Invalid username or password"))
        next(err);
    }
});

router.post('/refresh-token', async(req, res, next) => {
    try
    {
        const { refreshToken } = req.body;

        if(!refreshToken) throw createError.BadRequest();

        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAcessToken(userId);
        const newRefreshToken = await signRefreshToken(userId);

        res.send({access_token: accessToken, refresh_token: newRefreshToken});
    }
    catch(err)
    {
        next(err);
    }
});

router.delete('/logout', async(req, res, next) => {
    res.send('logout route');
});

module.exports = router;