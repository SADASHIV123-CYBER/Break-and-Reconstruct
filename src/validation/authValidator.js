const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const unauthorisedError = require('../utils/unauthorisedError')

function isLoggedIn(req, res, next) {
    const token = req.cookies?.['authToken'];

    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            message: 'Auth token is not provided',
            error: 'not authenticated'
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded) {
            throw new unauthorisedError();
        }

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }

        next();
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: 'Invalid token provided'
        })
    }
}

async function isAdmin(req, res, next) {
    const loggedInUser = req.user;

    if(loggedInUser.role === 'ADMIN') {
        next();
    } else {
        return res.status(401).json({
            success: false,
            data: {},
            error: {
                message: 'you are not authorised for this action',
                statusCode: 401
            },
            message: 'unauthorised for this action'
        })
    }
}

module.exports = {
    isLoggedIn, 
    isAdmin
}