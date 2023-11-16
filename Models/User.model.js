const db = require('mongoose');

const schema = new db.Schema({});

const UserSchema = new db.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const user = db.model('user', UserSchema);

export default user;