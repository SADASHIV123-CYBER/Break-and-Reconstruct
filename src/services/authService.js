const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");
const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt')

async function loginUser(authDetails) {
    const email = authDetails.email;

    const plainPassword = authDetails.password;

    const user = await findUser({email});

    if(!user) {
        throw {message: 'no user find with given email', statusCode: 404}
    }

    const isPasswordValidate = await bcrypt.compare(plainPassword, user.password);

    if(!isPasswordValidate) {
        throw {message: 'Invalid password, please try again', statusCode: 401}
    }

    const userRole = user.role ? user.role: "USER";

    const token = jwt.sign({email: user.email , id: user.id, role: userRole}, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    });

    return token
}

module.exports = loginUser;