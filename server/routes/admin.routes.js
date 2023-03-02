const Router = require('express').Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth/auth.middleware');

Router.route('/admin/grant/:userId').patch(AuthMiddleware, UserController.grantAdminPrivileges);
Router.route('/admin/revoke/:userId').patch(AuthMiddleware, UserController.revokeAdminPrivileges);
Router.route('/admin/dashboard').get(AuthMiddleware, UserController.accessAllUsers);

module.exports = Router;