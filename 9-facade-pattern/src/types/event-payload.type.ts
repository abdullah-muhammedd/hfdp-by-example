import { EventMap } from './event-map.type';
import { EventKey } from './event-key.type';
export type EventPayload<K extends EventKey> = EventMap[K];
