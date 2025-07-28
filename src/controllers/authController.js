const loginUser = require("../services/authService");

async function login(req, res) {
    try {
        const loginPayload = req.body;

        const responce = await loginUser(loginPayload);

        res.cookie( "authToken", responce, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            data: responce,
            error: {},
            message: 'logged in successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            error: error,
            message: error.message
        })
    }
}

module.exports = login;