const EventRepository = require('../repository/event.repository');

module.exports = class EventService {
    static createEventAsync = async (creationData) => {
        try {
            const response = await EventRepository.createEvent({
                title: creationData.title,
                description: creationData.description,
                eventDate: creationData.eventDate,
                eventTime: creationData.eventTime,
                eventType: creationData.eventType,
                emailInvites: creationData.emailInvites,
                eventOrganiser: creationData.eventOrganiser
            });
            return response;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllEventsAsync = async () => {
        try {
            const events = await EventRepository.getAllEvents();
            return events;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllPublicEventsAsync = async () => {
        try {
            const publicEvents = await EventRepository.getAllPublicEvents();
            return publicEvents;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getUserCreatedEventsAsync = async (userId) => {
        try {
            const userCreatedEvents = await EventRepository.getUserCreatedEvents(userId);
            return userCreatedEvents;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static editEventAsync = async (eventId, modificationData) => {
        try {
            const modifiedEvent = await EventRepository.editEvent(eventId, {
                title: modificationData.title,
                description: modificationData.description,
                eventDate: modificationData.eventDate,
                eventTime: modificationData.eventTime,
                eventType: modificationData.eventType,
                emailInvites: modificationData.emailInvites
            });
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static deleteEventAsync = async (eventId) => {
        try {
            const deletedEvent = await EventRepository.deleteEvent(eventId);
            return deletedEvent;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };
};