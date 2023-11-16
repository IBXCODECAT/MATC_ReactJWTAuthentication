const cryto = require('crypto');

//Generate a secret key
const key1 = cryto.randomBytes(32).toString('hex');
const key2 = cryto.randomBytes(32).toString('hex');

console.table({access_token: key1, refresh_token: key2});