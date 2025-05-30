export type PaymentDetails = {
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, unknown>;
};
