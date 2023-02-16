const UserService = require('../services/user.services');
const CreateError = require('http-errors');
const BcryptJS = require('bcryptjs');
const JWT = require('jsonwebtoken');

module.exports = class UserController {
    static register = async (req, res, next) => {
        try {
            if (await UserService.getUserByEmailAsync(req.body.email)) return next(CreateError.BadRequest('User Already Exists!'));

            let role;
            if (req.body.email.includes('admin')) role = -1;

            let passwordSalt = BcryptJS.genSaltSync(10);
            let passwordHash = BcryptJS.hashSync(req.body.password, passwordSalt);
            const newUser = await UserService.createUserAsync({
                fullName: req.body.fullName,
                role: role,
                email: req.body.email,
                passwordHash: passwordHash
            });

            return res.status(201).json({
                status: 201,
                message: 'User Created Successfully!'
            });
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };

    static login = async (req, res, next) => {
        try {
            if (!await UserService.getUserByEmailAsync(req.body.email)) return next(CreateError.NotFound('User Does Not Exist!'));
            if (!BcryptJS.compareSync(req.body.password, await UserService.getPasswordHashByEmailAsync(req.body.email))) return next(CreateError.Unauthorized('Invalid Credentials!'));

            let userId = await UserService.getUserIdByEmailAsync(req.body.email);
            let userRole = await UserService.getRoleByEmailAsync(req.body.email);
            let jwtToken = JWT.sign(
                {
                    id: userId,
                    role: userRole,
                    email: req.body.email
                },
                process.env.JWT_SECRET_KEY
            );

            return res.status(200).json({
                jwtToken: jwtToken
            });
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };

    static grantAdminPrivileges = async (req, res, next) => {
        try {
            if (req.user.role !== -1) return next(CreateError.Unauthorized('You Are Not Authorized For The Action!'));

            await UserService.setUserAsAdminAsync(req.params.userId);

            return res.status(200).json({
                status: 200,
                message: 'User Has Been Granted Admin Privileges!'
            });
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };

    static revokeAdminPrivileges = async (req, res, next) => {
        try {
            if (req.user.role !== -1) return next(CreateError.Unauthorized('You Are Not Authorized For The Action!'));

            await UserService.removeUserAsAdmin(req.params.userId);

            return res.status(200).json({
                status: 200,
                message: "User's Admin Privileges Revoked!"
            });
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };

    static accessAllUsers = async (req, res, next) => {
        try {
            if (req.user.role !== -1) return next(CreateError.Unauthorized('You Are Not Authorized For The Action!'));

            const response = await UserService.getAllNonSuperAdminUsersAsync();

            return res.status(200).json(response);
        }
        catch (err) {
            return next(CreateError.InternalServerError);
        }
    };
};