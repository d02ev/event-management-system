const Router = require('express').Router();
const UserController = require('../controllers/user.controller');

Router.route('/register').post(UserController.register);
Router.route('/login').post(UserController.login);

module.exports = Router;