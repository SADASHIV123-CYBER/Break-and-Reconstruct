const { findUser, createUser } = require("../repositories/userRepository");

async function registerUser(userDetails) {
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });

    if(user) {
        throw { reason: 'user with the given email and mobile number already exist', statusCode: 400 }
    }

    const newUser = await createUser({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
        mobileNumber: userDetails.mobileNumber
    });

    if(!newUser) {
        throw { reason: 'something went wrong, can not create user', statusCode:500 }
    }

    return newUser;
}

module.exports = {
    registerUser
}