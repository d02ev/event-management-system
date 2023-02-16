const Mongoose = require('mongoose');

const connectDB = async (dbUri) => {
    Mongoose.set('strictQuery', true);
    return Mongoose.connect(
        dbUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
};

module.exports = connectDB;