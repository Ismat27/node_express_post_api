const CustomAPIError = require('./custom')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')

class APIError extends CustomAPIError {
    constructor (message, statusCode) {
        super(message)
        this.statusCode  = statusCode
    }
}


module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFoundError,
    APIError
}