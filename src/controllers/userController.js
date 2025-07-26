const { registerUser } = require("../services/userService");

async function createUser(req, res) {
    try {
        const responce = await registerUser(req.body);
        return res.status(201).json({
            message: 'successfully registered the user',
            success: true,
            data: responce,
            error: {}
        })
    } catch(error) {
        console.log("Creater User Error",error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || error.message || 'something went wrong',
            data: {},
            error: error
        })
    }
}

module.exports = {
    createUser
}