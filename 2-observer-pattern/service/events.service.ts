import { ObserverInterface } from '../types/interfaces/observer.interface';
import { Event } from '../types/event.type';

export class EventsService {
  private observers: ObserverInterface[] = [];

  subscribe(observer: ObserverInterface): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }

    console.log(`Subject: Attached an observer ${observer.constructor.name}`);
    this.observers.push(observer);
  }

  unsubscribe(observer: ObserverInterface): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
  }

  notify(event: Event): void {
    console.log('Subject: Notifying observers...');
    for (const observer of this.observers) {
      observer.update(event);
    }
  }
}
