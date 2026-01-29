/**
 * Infrastructure Layer - Logger Utility
 *
 * Logging disabled: this module intentionally provides no-op methods so that
 * imports of `Logger` do not emit any console output in any environment.
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export class Logger {
  static setLogLevel(_level: LogLevel): void {
    // no-op
  }

  static error(_message: string, _error?: unknown): void {
    // no-op
  }

  static warn(_message: string, ..._args: unknown[]): void {
    // no-op
  }

  static info(_message: string, ..._args: unknown[]): void {
    // no-op
  }

  static debug(_message: string, ..._args: unknown[]): void {
    // no-op
  }
}
