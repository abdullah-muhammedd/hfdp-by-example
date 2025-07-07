export type AuditLog = {
  userId?: number;
  action: string;
  entity?: string;
  entityId?: string | number;
  details?: Record<string, any>;
  timestamp: Date;
};
