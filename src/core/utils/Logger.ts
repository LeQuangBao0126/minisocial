import winston from 'winston';

const Logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
        // new winston.transports.File({ filename: 'combined.log' })
    ]
});
export default Logger;