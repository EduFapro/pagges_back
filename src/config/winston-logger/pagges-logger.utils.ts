import { Logger } from 'winston'

// Singleton class to handle the logger
export class PaggesLogger {
  private static logger: Logger

  static setLogger(logger: Logger) {
    this.logger = logger
  }

  static log(message: string) {
    this.logger?.info(message)
  }

  static error(message: string, trace?: string) {
    this.logger?.error(message, { trace })
  }

  static debug(message: string) {
    this.logger?.debug(message)
  }

  static warn(message: string) {
    this.logger?.warn(message)
  }

  static http(message: string) {
    this.logger?.http(message)
  }

  static instance(): Logger {
    return this.logger
  }
}
