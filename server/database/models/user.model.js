const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },
    passwordHash: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'users'
});

module.exports = Mongoose.model('UserModel', userSchema);