import { Logger } from '@core/utils';
import { HttpException } from './../exceptions';
const ErrorMiddleware = async (error: HttpException, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'something went wrong ';
    Logger.error(`Error - ${status} ---- Message ${message}`);
    res.status(status).json({ message: message });
}
export default ErrorMiddleware;