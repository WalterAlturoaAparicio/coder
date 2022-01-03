import log4js from "log4js";

log4js.configure({
    appenders: {
        consolaInfo: { type: 'console' },
        fileWarnings: { type: 'file', filename: 'warn.log' },
        fileErrors: { type: 'file', filename: 'error.log' },
        loggerConsole: { type: 'logLevelFilter', appender: 'consolaInfo', level: 'info' },
        loggerFileWarn: { type: 'logLevelFilter', appender: 'fileWarnings', level: 'warn' },
        loggerFileError: { type: 'logLevelFilter', appender: 'fileErrors', level: 'error' }
    },
    categories: {
        default: { appenders: ['loggerConsole'], level: 'all' },
        prod: { appenders: ['loggerConsole', 'loggerFileWarn', 'loggerFileError'], level: 'all' }
    }
})
// if () {

// } else
export const logger = log4js.getLogger('prod');