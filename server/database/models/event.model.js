const Mongoose = require('mongoose');

const eventSchema = new Mongoose.Schema({
    eventOrganiser: {
        type: Mongoose.Schema.Types.ObjectId,
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
    },
    emailInvites: {
        type: String,
        required: false
    },
    isPublic: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true,
    collection: 'events'
});

module.exports = Mongoose.model('EventModel', eventSchema);