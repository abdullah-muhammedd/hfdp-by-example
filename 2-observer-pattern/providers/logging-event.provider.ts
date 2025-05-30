import { ObserverInterface } from '../types/interfaces/observer.interface';
import { Event } from '../types/event.type';

export class LoggingEventProvider implements ObserverInterface {
  update(event: Event): void {
    console.log('📝 System Log Entry:');
    console.log('-------------------');
    console.log(`Timestamp: ${new Date(event.timestamp).toISOString()}`);
    console.log(`Event Type: ${event.type}`);
    console.log(`Source: ${event.source}`);
    console.log('Payload:', JSON.stringify(event.body, null, 2));
    console.log('-------------------');
  }
}
