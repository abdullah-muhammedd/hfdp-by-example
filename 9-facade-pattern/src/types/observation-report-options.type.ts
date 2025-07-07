import { LogOptions } from './log-options.type';
import { NotificationOptions } from './notification-options.type';
import { EventKey } from './event-key.type';
import { EventPayload } from './event-payload.type';
import { ReportOptions } from './report-options.type';
import { AuditLog } from './audit-log.type';

export type ObservationReportOptions = {
  log?: LogOptions;
  notification?: NotificationOptions;
  event?: { key: EventKey; payload: EventPayload<EventKey> };
  report?: ReportOptions;
  audit?: AuditLog;
};
