import chalk from 'chalk';
import EventEmitter from 'events';
import { injectable } from 'tsyringe';

@injectable()
export class Scream extends EventEmitter{
    private static readonly levels = ['debug', 'info', 'warning', 'error'] as const;
    constructor() {
        super({captureRejections: true});
    }
    log(level: typeof Scream.levels[number], message: string) {
        const currentDate = new Date().toISOString();
        const logLevel = level.toLowerCase();
        if (!Scream.levels.includes(logLevel as typeof Scream.levels[number])) {
            throw new Error(`invalid log level: ${logLevel}`);
        }
        let logMessage = `[${currentDate}] [${logLevel.toUpperCase()}] ${message}\n`;
        switch (level) {
            case 'debug':
                logMessage = chalk.blue(logMessage);
                break;
            case 'info':
                logMessage = chalk.green(logMessage);
                break;
            case 'warning':
                logMessage = chalk.bgYellow.red(logMessage);
                break;
            case 'error':
                logMessage = chalk.bgWhite.red(logMessage);
                break;
            default:
                break;
        }
        process.stdout.write(logMessage);
    }
    debug(message: string) {
        this.log('debug', message);
    }
    info(message: string) {
        this.log('info', message);
    }
    warn(message: string) {
        this.log('warning', message);
    }
    error(message: string) {
        this.log('error', message);
    }
}