const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAcessToken: (userId) => {

        const payload = {};

        const secret = "some super secret";

        //Generate a JWT token
        const options = {
            audience: userId,
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour
            issuer: "Nathan Schmitt",
        }

        //Generate a secret key
        return new Promise((resolve, reject) => {
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) return reject(err);
                resolve(token);
            });
        });
    }
}