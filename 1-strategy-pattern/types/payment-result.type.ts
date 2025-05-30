import { PaymentStatus } from './enum/payment-status.enum';

export type PaymentResult = {
  success: boolean;
  transactionId: string;
  timestamp: Date;
  status: PaymentStatus;
  errorMessage?: string;
  receiptUrl?: string;
};
