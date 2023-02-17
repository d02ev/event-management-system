const EventModel = require('../database/models/event.model');

module.exports = class EventRepository {
    static createEvent = async (creationData) => {
        try {
            const newEvent = {
                title: creationData.title,
                description: creationData.description,
                eventDate: creationData.eventDate,
                eventTime: creationData.eventTime,
                eventType: creationData.eventType,
                emailInvites: creationData.emailInvites,
                eventOrganiser: creationData.eventOrganiser
            };
            const creationResponse = await EventModel(creationData).save();

            return creationResponse;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getAllEvents = async () => {
        try {
            const events = await EventModel.find({});
            return events;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getAllPublicEvents = async () => {
        try {
            const publicEvents = await EventModel.find({ eventType: 'Public' });
            return publicEvents;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getUserCreatedEvents = async (userId) => {
        try {
            const userCreatedEvents = await EventModel.find({ eventOrganiser: userId });
            return userCreatedEvents;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static editEvent = async (eventId, modificationData) => {
        try {
            const modifiedEventData = {
                title: modificationData.title,
                description: modificationData.description,
                eventDate: modificationData.eventDate,
                eventTime: modificationData.eventTime,
                eventType: modificationData.eventType,
                emailInvites: modificationData.emailInvites
            };
            const modifiedEvent = await EventModel.findByIdAndUpdate(eventId, modificationData);

            return modifiedEvent;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static deleteEvent = async (eventId) => {
        try {
            const deletedEvent = await EventModel.findByIdAndDelete(eventId);
            return deletedEvent;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };
};