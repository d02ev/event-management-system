const UserRepository = require('../repository/user.repository');

module.exports = class UserService {
    static createUserAsync = async (creationData) => {
        try {
            const response = await UserRepository.createUser({
                fullName: creationData.fullName,
                email: creationData.email,
                role: creationData.role,
                passwordHash: creationData.passwordHash
            });
            return response;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllNonSuperAdminUsersAsync = async () => {
        try {
            const users = UserRepository.getAllNonSuperAdminUsers();
            return users;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getUserByEmailAsync = async (userEmail) => {
        try {
            const user = await UserRepository.getUserByEmail(userEmail);
            return user;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getPasswordHashByEmailAsync = async (userEmail) => {
        try {
            const userPasswordHash = await UserRepository.getPasswordHashByEmail(userEmail);
            return userPasswordHash;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getRoleByEmailAsync = async (userEmail) => {
        try{
            const userRole = await UserRepository.getRoleByEmail(userEmail);
            return userRole;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getUserIdByEmailAsync = async (userEmail) => {
        try {
            const userId = await UserRepository.getUserIdByEmail(userEmail);
            return userId;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static setUserAsAdminAsync = async (userId) => {
        try {
            const adminUser = await UserRepository.setUserAsAdmin(userId);
            return adminUser;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static removeUserAsAdmin = async (userId) => {
        try {
            const nonAdminUser = await UserRepository.removeUserAsAdmin(userId);
            return nonAdminUser;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };
};