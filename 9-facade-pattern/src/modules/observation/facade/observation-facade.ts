import { NotificationService } from '../services/notification.service';
import { LogService } from '../services/log.service';
import { EventService } from '../services/event.service';
import { ReportService } from '../services/report.service';
import { AuditService } from '../services/audit.service';
import { ObservationReportOptions } from '../../../types/observation-report-options.type';
import { LogLevel } from '../../../types/log-level.type';
import { NotificationChannel } from '../../../types/notification-channel.type';
import { EventKey } from '../../../types/event-key.type';
import { ReportOptions } from '../../../types/report-options.type';
import { AuditLog } from '../../../types/audit-log.type';

export class ObservationFacade {
  private static notificationService = new NotificationService();
  private static logService = new LogService();
  private static eventService = new EventService();
  private static reportService = new ReportService();
  private static auditService = new AuditService();

  static async report(options: ObservationReportOptions): Promise<void> {
    try {
      if (options.log) {
        this.logService.log(options.log);
      }
      if (options.notification) {
        await this.notificationService.send(options.notification);
      }
      if (options.event) {
        this.eventService.emit(options.event.key, options.event.payload);
      }
      if (options.report) {
        await this.reportService.generateReport(options.report);
        console.log('[REPORT] Report written:', options.report.reportName);
      }
      if (options.audit) {
        await this.auditService.record(options.audit);
        console.log('[AUDIT] Audit log written:', options.audit.action);
      }
    } catch (err) {
      console.error('[ObservationFacade] Error in report:', err);
    }
  }

  static buildOptions(params: {
    logLevel?: LogLevel;
    logMessage?: string;
    logContext?: string;
    notificationChannel?: NotificationChannel;
    notificationTo?: string;
    notificationSubject?: string;
    notificationMessage?: string;
    eventKey?: EventKey;
    eventPayload?: any;
    reportOptions?: ReportOptions;
    auditLog?: AuditLog;
  }): ObservationReportOptions {
    const options: ObservationReportOptions = {};
    if (params.logLevel && params.logMessage) {
      options.log = {
        level: params.logLevel,
        message: params.logMessage,
        context: params.logContext,
      };
    }
    if (params.notificationChannel && params.notificationTo && params.notificationMessage) {
      options.notification = {
        channel: params.notificationChannel,
        to: params.notificationTo,
        subject: params.notificationSubject,
        message: params.notificationMessage,
      };
    }
    if (params.eventKey && params.eventPayload) {
      options.event = {
        key: params.eventKey,
        payload: params.eventPayload,
      };
    }
    if (params.reportOptions) {
      options.report = params.reportOptions;
    }
    if (params.auditLog) {
      options.audit = params.auditLog;
    }
    return options;
  }
}
