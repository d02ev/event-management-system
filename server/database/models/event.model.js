const Mongoose = require('mongoose');

const eventSchema = new Mongoose.Schema({
    eventOrganiser: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    eventDate: {
        type: String,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        default: 'Public'
    },
    emailInvites: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    collection: 'events'
});

module.exports = Mongoose.model('EventModel', eventSchema);