import { injectable } from 'tsyringe';

@injectable()
export class Scream {
    private static readonly levels = ['debug', 'info', 'warning', 'error'] as const;
    private static readonly levelColors: Record<typeof Scream.levels[number], string> = {
        debug: '\x1b[35m',
        info: '\x1b[32m',
        warning: '\x1b[33m',
        error: 'x1b[31m'
    };
    constructor() {}
    log(level: typeof Scream.levels[number], message: string) {
        const currentDate = new Date().toISOString();
        const logLevel = level.toLowerCase();
        if (!Scream.levels.includes(logLevel as typeof Scream.levels[number])) {
            throw new Error(`invalid log level: ${logLevel}`);
        }
        const color = Scream.levelColors[logLevel];
        const logMessage = `${color} [${currentDate}] [${logLevel.toUpperCase()}] ${message}\x1b[0m]`;
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