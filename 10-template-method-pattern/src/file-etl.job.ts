import { PrismaClient } from '../generated/prisma/';
import { WebEvent } from './types/web-event.ty';

const prisma = new PrismaClient();

export abstract class FileETLJob {
  async run(): Promise<void> {
    const raw = await this.extract();
    const transformed = this.transform(raw);
    const cleaned = this.clean(transformed);
    await this.load(cleaned);
    this.logResult();
  }

  // Subclasses implement extract
  protected abstract extract(): Promise<any[]>;

  // Common transformation: adapt raw structure to WebEvent schema
  private transform(data: any[]): WebEvent[] {
    console.log('Transforming raw rows to WebEvent model...');
    return data.map((row) => ({
      id: row.id ? Number(row.id) : (null as any),
      userId: row.userId || 'anonymous',
      sessionId: row.sessionId,
      eventType: row.eventType?.toLowerCase(),
      url: row.url,
      referrer: row.referrer || null,
      userAgent: row.userAgent || null,
      deviceType: this.normalizeDevice(row.deviceType),
      browser: row.browser || null,
      country: row.country || null,
      timestamp: row.tmestamp ? new Date(row.timestamp) : new Date(Date.now()),
      createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
      ipAddress: row.ipAddress || null,
      countryCode: row.countryCode || null,
      isBot: Boolean(row.isBot) ?? false,
    }));
  }

  private clean(data: WebEvent[]): WebEvent[] {
    console.log(`[${this.constructor.name}] Cleaning event data...`);
    return data
      .filter((event) => event.eventType && event.timestamp && event.sessionId && event.userId)
      .map((event) => ({
        ...event,
        url: event.url.trim(),
        eventType: event.eventType.trim(),
        deviceType: event.deviceType.toLowerCase(),
      }));
  }

  private async load(data: WebEvent[]): Promise<void> {
    console.log(`[${this.constructor.name}]  Loading ${data.length} events into database...`);
    for (const row of data) {
      try {
        await prisma.webEvent.create({ data: row });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : error;
        console.error(`[${this.constructor.name}] Failed to insert row:`, errorMessage);
      }
    }
  }

  private logResult(): void {
    console.log(`[${this.constructor.name}]  ETL run completed.`);
  }

  private normalizeDevice(device: string = ''): string {
    const d = device.toLowerCase();
    if (d.includes('mobile')) return 'mobile';
    if (d.includes('tablet')) return 'tablet';
    return 'desktop';
  }
}
