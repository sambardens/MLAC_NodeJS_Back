export class ApiError extends Error {
    constructor(status, message, success) {
        super();
        this.status = status
        this.message = message
        this.success = success
    }

    static badRequest(message) {
        return new ApiError(400, message, false)
    }

    static forbidden(message) {
        return new ApiError(403, message, false)
    }

    static unAuthorized(message) {
        return new ApiError(401, message, false)
    }
}