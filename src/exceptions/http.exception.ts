import { ExceptionHandler } from "winston";

export default class HttpException extends Error {
    public status;
    public message;
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
} 