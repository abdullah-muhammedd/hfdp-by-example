import { PaymentStatus } from '../enum/payment-status.enum';
import { PaymentDetails } from '../payment-details.type';
import { PaymentResult } from '../payment-result.type';

export interface PaymentStrategy {
  /**
   * Initialize the payment strategy with necessary credentials
   * @throws {Error} If initialization fails
   */
  initialize(config: Record<string, unknown>): Promise<void>;

  /**
   * Process a payment transaction
   * @param details Payment transaction details
   * @returns Payment processing result
   * @throws {Error} If payment processing fails
   */
  processPayment(details: PaymentDetails): Promise<PaymentResult>;

  /**
   * Validate payment details before processing
   * @param details Payment details to validate
   * @returns true if valid, throws error if invalid
   * @throws {Error} If validation fails
   */
  validatePayment(details: PaymentDetails): Promise<boolean>;

  /**
   * Refund a previously processed payment
   * @param transactionId ID of the transaction to refund
   * @param amount Amount to refund (optional, defaults to full amount)
   * @returns Refund processing result
   * @throws {Error} If refund fails
   */
  refundPayment(transactionId: string, amount?: number): Promise<PaymentResult>;

  /**
   * Get the status of a payment transaction
   * @param transactionId ID of the transaction to check
   * @returns Current status of the payment
   * @throws {Error} If status check fails
   */
  getPaymentStatus(transactionId: string): Promise<PaymentStatus>;
}
