const Router = require('express').Router();
const AuthMiddleware = require('../middlewares/auth/auth.middleware');
const EventController = require('../controllers/event.controller');

Router.route('/').post(AuthMiddleware, EventController.organiseEvent);
Router.route('/').get(AuthMiddleware, EventController.accessAllEvents);
Router.route('/public').get(EventController.accessAllPublicEvents);
Router.route('/dashboard').get(AuthMiddleware, EventController.accessUserCreatedEvents);
Router.route('/edit/:eventId').patch(AuthMiddleware, EventController.modifyEvent);
Router.route('/delete/:eventId').delete(AuthMiddleware, EventController.removeEvent);

module.exports = Router;