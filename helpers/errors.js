class ServerError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
    }
}

class ValidationError extends ServerError {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

module.exports = {
    ServerError,
    ValidationError
}