import { ObserverInterface } from '../types/interfaces/observer.interface';
import { Event } from '../types/event.type';

export class EmailEventProvider implements ObserverInterface {
  private readonly email: string;

  constructor(email: string) {
    this.email = email;
  }

  update(event: Event): void {
    console.log(`📧 Email sent to ${this.email}`);
    console.log(`Subject: New Event - ${event.type}`);
    console.log(
      `Body: Event from ${event.source} at ${new Date(event.timestamp).toLocaleString()}`,
    );
    console.log('Details:', JSON.stringify(event.body, null, 2));
    console.log('-------------------');
  }
}
