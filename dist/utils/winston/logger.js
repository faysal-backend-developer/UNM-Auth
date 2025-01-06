"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, prettyPrint } = winston_1.format;
const path_1 = __importDefault(require("path"));
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'right meow!' }), timestamp(), prettyPrint()),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'log', 'winston', 'info', 'UNM-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'right meow!' }), timestamp(), prettyPrint()),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'log', 'winston', 'error', 'UNM-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.transports.Console({
        format: winston_1.format.simple(),
    }));
    exports.errorLogger.add(new winston_1.transports.Console({
        format: winston_1.format.simple(),
    }));
}
