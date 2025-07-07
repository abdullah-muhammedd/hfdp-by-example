import { LogLevel } from './log-level.type';
export type LogOptions = {
  level: LogLevel;
  message: string;
  context?: string;
  meta?: Record<string, any>;
};
