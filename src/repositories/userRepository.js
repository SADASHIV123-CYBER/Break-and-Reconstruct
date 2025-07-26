const User = require("../schema/userSchema");

async function findUser(parameters) {
    try {
        const responce = User.findOne({ ...parameters });
        return responce;
    } catch (error) {
        console.log(error);
    }
}

async function createUser(userDetails) {
    try {
        const responce = await User.create(userDetails);
        return responce 
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    findUser,
    createUser
}