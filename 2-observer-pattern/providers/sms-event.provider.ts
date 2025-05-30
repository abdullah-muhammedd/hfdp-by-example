import { ObserverInterface } from '../types/interfaces/observer.interface';
import { Event } from '../types/event.type';

export class SMSEventProvider implements ObserverInterface {
  private readonly phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  update(event: Event): void {
    console.log(`📱 SMS sent to ${this.phoneNumber}`);
    console.log(`Alert: ${event.type} event from ${event.source}`);
    console.log(`Time: ${new Date(event.timestamp).toLocaleString()}`);
    console.log('-------------------');
  }
}
