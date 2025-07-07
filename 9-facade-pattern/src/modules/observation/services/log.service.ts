import { LogLevel } from '../../../types/log-level.type';
import { LogOptions } from '../../../types/log-options.type';
import { COLORS } from '../../../constants/colors.constant';

export class LogService {
  log(options: LogOptions): void {
    switch (options.level as LogLevel) {
      case 'info':
        this.logInfo(options);
        break;
      case 'warning':
        this.logWarning(options);
        break;
      case 'error':
        this.logError(options);
        break;
      default:
        throw new Error(`Unsupported log level: ${options.level}`);
    }
  }

  private logInfo(options: LogOptions) {
    console.log(
      `${COLORS.info}[INFO]${options.context ? ' [' + options.context + ']' : ''} ${options.message}${COLORS.reset}`,
      options.meta || '',
    );
  }

  private logWarning(options: LogOptions) {
    console.warn(
      `${COLORS.warning}[WARNING]${options.context ? ' [' + options.context + ']' : ''} ${options.message}${COLORS.reset}`,
      options.meta || '',
    );
  }

  private logError(options: LogOptions) {
    console.error(
      `${COLORS.error}[ERROR]${options.context ? ' [' + options.context + ']' : ''} ${options.message}${COLORS.reset}`,
      options.meta || '',
    );
  }
}
