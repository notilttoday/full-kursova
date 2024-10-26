export enum LogLevel {
  Log = 'log',
  Error = 'error',
  Warn = 'warn',
  Debug = 'debug',
  Verbose = 'verbose',
  Fatal = 'fatal',
}

export interface Logger {
  /**
   * Write a 'log' level log.
   */
  log(message: unknown): Promise<void>
  /**
   * Write an 'error' level log.
   */
  error(message: unknown): Promise<void>
  /**
   * Write a 'warn' level log.
   */
  warn(message: unknown): Promise<void>
  /**
   * Write a 'debug' level log.
   */
  debug?(message: unknown): Promise<void>
  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: unknown): Promise<void>
  /**
   * Write a 'fatal' level log.
   */
  fatal?(message: unknown): Promise<void>
  /**
   * Set log levels.
   * @param levels log levels
   */
  setLogLevels?(levels: LogLevel[]): void
}
