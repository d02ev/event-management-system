const Router = require('express').Router();
const AuthMiddleware = require('../middlewares/auth/auth.middleware');
const EventController = require('../controllers/event.controller');

Router.route('/event').post(AuthMiddleware, EventController.organiseEvent);
Router.route('/event').get(AuthMiddleware, EventController.accessAllEvents);
Router.route('/event/:eventId').get(EventController.accessAEvent);
Router.route('/event/public/all').get(EventController.accessAllPublicEvents);
Router.route('/event/dashboard/all').get(AuthMiddleware, EventController.accessUserCreatedEvents);
Router.route('/event/edit/:eventId').patch(AuthMiddleware, EventController.modifyEvent);
Router.route('/event/delete/:eventId').delete(AuthMiddleware, EventController.removeEvent);

module.exports = Router;