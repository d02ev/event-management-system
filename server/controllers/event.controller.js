const EventService = require('../services/event.services');
const CreateError = require('http-errors');

module.exports = class EventController {
    static organiseEvent = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const newEvent = await EventService.createEventAsync({
                title: req.body.title,
                description: req.body.description,
                eventDate: req.body.eventDate,
                eventTime: req.body.eventTime,
                eventType: req.body.eventType,
                emailInvites: req.body.emailInvites,
                eventOrganiser: userId
            });

            return res.status(201).json({
                status: 201,
                message: 'Event Created Successfully!'
            });
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };

    static accessAllEvents = async (req, res, next) => {
        try {
            if (req.user.role !== 1) return next(CreateError.Unauthorized('You Are Not Authorized For The Action!'));

            const response = await EventService.getAllEventsAsync();
            return res.status(200).json(response);
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };

    static accessAllPublicEvents = async (req, res, next) => {
        try {
            const response = await EventService.getAllPublicEventsAsync();
            return res.status(200).json(response);
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };

    static accessUserCreatedEvents = async (req, res, next) => {
        try {
            const response = await EventService.getUserCreatedEventsAsync(req.user.id);
            return res.status(200).json(response);
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };

    static modifyEvent = async (req, res, next) => {
        try {
            const response = await EventService.editEventAsync(req.params.eventId, {
                title: modificationData.title,
                description: modificationData.description,
                eventDate: modificationData.eventDate,
                eventTime: modificationData.eventTime,
                eventType: modificationData.eventType,
                emailInvites: modificationData.emailInvites
            });
            return res.status(200).json({
                status: 200,
                message: 'Event Modified Successfully!'
            });
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };

    static removeEvent = async (req, res, next) => {
        try {
            const response = await EventService.deleteEventAsync(req.params.eventId);
            return res.status(200).json({
                status: 200,
                message: 'Event Deleted Successfully!'
            });
        }
        catch(err) {
            return next(CreateError.InternalServerError);
        }
    };
};