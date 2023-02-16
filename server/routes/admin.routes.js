const Router = require('express').Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth/auth.middleware');

Router.route('/grant/:userId').patch(AuthMiddleware, UserController.grantAdminPrivileges);
Router.route('/revoke/:userId').patch(AuthMiddleware, UserController.revokeAdminPrivileges);
Router.route('/dashboard').get(AuthMiddleware, UserController.accessAllUsers);

module.exports = Router;