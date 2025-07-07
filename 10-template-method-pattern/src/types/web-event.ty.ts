export type WebEvent = {
  id: number;
  userId: string;
  sessionId: string;
  eventType: string;
  url: string;
  referrer?: string | null;
  userAgent?: string | null;
  deviceType: string;
  browser?: string | null;
  country?: string | null;
  timestamp: Date;
  createdAt: Date;
  ipAddress?: string | null;
  countryCode?: string | null;
  isBot: boolean;
};
