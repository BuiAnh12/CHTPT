import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}][${level.toUpperCase()}]: ${message}`;
        })
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: './logs/server.log', options: { flags: 'a' }}),
        new transports.Console({
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
                })
            ),
        }),
    ],
});

// Override console.log
const originalLog = console.log;
console.log = (...args) => {
    originalLog(...args); // Call the original console.log
    logger.info(args.join(' ')); // Use the Winston logger to log
};

export default logger;
