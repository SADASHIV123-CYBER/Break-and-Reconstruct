const AppError = require("./appError");

class UnauthorisedError extends AppError {
    constructor() {
        super(`user is not authorised properly`, 401)
    }
}

module.exports = UnauthorisedError;