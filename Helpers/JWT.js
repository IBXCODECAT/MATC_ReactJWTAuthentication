const JWT = require('jsonwebtoken');
const createError = require('http-errors');

require('dotenv').config();

module.exports = {
    signAcessToken: (userId) => {

        const payload = {};

        const secret = process.env.ACESS_TOKEN_SECRET;

        //Generate a JWT token
        const options = {
            audience: userId,
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour
            issuer: "Nathan Schmitt",
        }

        //Generate a secret key
        return new Promise((resolve, reject) => {
            JWT.sign(payload, secret, options, (err, token) => {
                if(err)
                {
                    console.error(err.message);
                    //reject(err); - SECURITY VULNERABLITY (ERROR LEAK), DO NOT USE
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    verifyAccessToken: (req, res, next) => {
        if(!req.headers['authorization']) return next(createError.Unauthorized("Unauthorized"));

        //Get the token from the header
        const authHeader = req.headers['authorization'];
        const beaerToken = authHeader.split(' ');
        const token = beaerToken[1];

        JWT.verify(token, process.env.ACESS_TOKEN_SECRET, (err, payload) => { 
            if(err)
            {
                console.error(err.message);
                //401 = Unauthorized
                return next(createError.Unauthorized("Unauthorized"));
            }
            
            //Add the payload to the request
            req.payload = payload;
            next();
        });
    }
}