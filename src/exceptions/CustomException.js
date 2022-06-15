class CustomException extends Error {
    constructor(message, statusCode = 500, name = 'Error') {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

module.exports = CustomException;