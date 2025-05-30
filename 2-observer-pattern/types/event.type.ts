export type Event = {
  type: string;
  source: string;
  body: Record<string, any>;
  timestamp: number;
};
