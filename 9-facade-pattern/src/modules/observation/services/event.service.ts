import { EventEmitter } from 'events';
import { EventKey } from '../../../types/event-key.type';
import { EventPayload } from '../../../types/event-payload.type';

export class EventService {
  private emitter = new EventEmitter();

  emit<K extends EventKey>(event: K, payload: EventPayload<K>): void {
    console.log(`[EVENT] Emitted: ${event}`, payload);
    this.emitter.emit(event, payload);
  }

  on<K extends EventKey>(event: K, listener: (payload: EventPayload<K>) => void): void {
    this.emitter.on(event, listener);
  }

  off<K extends EventKey>(event: K, listener: (payload: EventPayload<K>) => void): void {
    this.emitter.off(event, listener);
  }
}
