const Router = require('express').Router();
const UserController = require('../controllers/user.controller');

Router.route('/auth/register').post(UserController.register);
Router.route('/auth/login').post(UserController.login);

module.exports = Router;