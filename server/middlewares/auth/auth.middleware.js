const JWT = require('jsonwebtoken');
const CreateError = require('http-errors');

const verifyAuthToken = (req, res, next) => {
    let authToken = req.headers.authorization;

    if (!authToken) {
        return next(CreateError.Forbidden('No Auth Token Found!'));
    }

    try {
        authToken = authToken.slice(7);
        const decodedToken = JWT.verify(authToken, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
    }
    catch (err) {
        return next(CreateError.Unauthorized('You Are Not Authorized For The Action!'));
    }

    return next();
};

module.exports = verifyAuthToken;