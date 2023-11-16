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

//Hash password before saving to database
UserSchema.pre('save', async () => {
    try {
        //Generate a salt and hash password
        const salt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
});

UserSchema.methods.isValidPassword = async (password) => {
    try {
        //Compare the password with the hashed password
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const UserModel = db.model('Users', UserSchema);

module.exports = { UserModel };