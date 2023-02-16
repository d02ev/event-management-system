const UserModel = require('../database/models/user.model');

module.exports = class UserRepository {
    static createUser = async (creationData) => {
        try {
            const newUser = {
                fullName: creationData.fullName,
                email: creationData.email,
                role: creationData.role,
                passwordHash: creationData.passwordHash
            };
            const creationResponse = await UserModel(newUser).save();

            return creationResponse;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getAllNonSuperAdminUsers = async () => {
        try {
            const nonSuperAdminUsers = await UserModel.find({
                $or: [ { role: 0 }, { role: 1 }]
            });
            return nonSuperAdminUsers;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getUserByEmail = async (userEmail) => {
        try {
            const user = await UserModel.findOne({ email: userEmail });
            return user;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getPasswordHashByEmail = async (userEmail) => {
        try {
            const user = await this.getUserByEmail(userEmail);
            const userPasswordHash = user.passwordHash;

            return userPasswordHash;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getRoleByEmail = async (userEmail) => {
        try {
            const user = await this.getUserByEmail(userEmail);
            const userRole = user.role;

            return userRole;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getUserIdByEmail = async (userEmail) => {
        try {
            const user = await this.getUserByEmail(userEmail);
            const userId = user._id;

            return userId;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static setUserAsAdmin = async (userId) => {
        try {
            const user = await UserModel.findByIdAndUpdate(userId, { role: 1 });
            return user;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static removeUserAsAdmin = async (userId) => {
        try {
            const user = await UserModel.findByIdAndUpdate(userId, { role: 0 });
            return user;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };
};