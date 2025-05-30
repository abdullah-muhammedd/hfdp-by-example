import { Event } from '../types/event.type';
import { EventsService } from './events.service';

export class UserService {
  private eventsService: EventsService;
  private readonly eventSource = this.constructor.name;
  constructor(eventsService: EventsService) {
    this.eventsService = eventsService;
  }

  simulateUserLogin(userId: string): void {
    const event: Event = {
      type: 'USER_LOGIN',
      source: this.eventSource,
      body: {
        userId,
        action: 'login',
        ipAddress: '192.168.1.1',
      },
      timestamp: Date.now(),
    };
    this.eventsService.notify(event);
  }

  simulateUserLogout(userId: string): void {
    const event: Event = {
      type: 'USER_LOGOUT',
      source: this.eventSource,
      body: {
        userId,
        action: 'logout',
        sessionDuration: '2h 30m', // Simulated duration
      },
      timestamp: Date.now(),
    };
    this.eventsService.notify(event);
  }

  simulateFailedLogin(userId: string, attempts: number): void {
    const event: Event = {
      type: 'USSSER_FAILED_LOGIN_ATTEMPT',
      source: this.eventSource,
      body: {
        userId,
        attempts,
        status: 'blocked',
        reason: 'Too many failed attempts',
      },
      timestamp: Date.now(),
    };
    this.eventsService.notify(event);
  }
}
