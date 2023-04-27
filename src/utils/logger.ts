import log4js from 'log4js'

export default class Logger {
  private logger: log4js.Log4js

  constructor() {
    this.logger = log4js.configure({
      appenders: {
        out: { type: 'console' },
        info: { type: 'dateFile', filename: process.cwd() + '/logs/info.log' },
        warn: { type: 'dateFile', filename: process.cwd() + '/logs/warn.log' },
        error: {
          type: 'dateFile',
          filename: process.cwd() + '/logs/error.log',
        },
      },
      categories: {
        default: { appenders: ['out', 'info'], level: 'debug' },
        warn: { appenders: ['out', 'warn'], level: 'debug' },
        error: { appenders: ['error'], level: 'debug' },
        showError: { appenders: ['out', 'error'], level: 'debug' },
      },
    })
  }

  info(message: any) {
    this.logger.getLogger('default').info(message)
  }

  warn(message: any) {
    this.logger.getLogger('warn').warn(message)
  }

  error(message: any) {
    this.logger.getLogger('error').error(message)
  }

  showError(message: any) {
    this.logger.getLogger('showError').error(message)
  }
}
