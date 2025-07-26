const AppError = require("./appError");

class NotFoundError extends AppError {
    constructor(resource) {
        super(`Not able to find ${resource}`);
    }
}

module.exports = NotFoundError;