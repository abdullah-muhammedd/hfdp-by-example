import { PaymentStrategy } from '../types/interfaces/payment-strategy.interface';
import { PaymentDetails } from '../types/payment-details.type';
import { PaymentResult } from '../types/payment-result.type';
import { PaymentStatus } from '../types/enum/payment-status.enum';

/**
 * PaymentService implements the Strategy pattern for payment processing.
 * It can work with any payment strategy that implements the PaymentStrategy interface.
 */
export class PaymentService {
  private strategy: PaymentStrategy | null = null;

  /**
   * Sets or changes the payment strategy at runtime
   * @param strategy The payment strategy to use
   */
  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  /**
   * Gets the current payment strategy
   * @returns The current payment strategy or null if none is set
   */
  getStrategy(): PaymentStrategy | null {
    return this.strategy;
  }

  /**
   * Processes a payment using the current strategy
   * @param details Payment details
   * @throws Error if no strategy is set
   */
  async processPayment(details: PaymentDetails): Promise<PaymentResult> {
    if (!this.strategy) {
      throw new Error('Payment strategy not set');
    }

    try {
      // Initialize the strategy if needed
      await this.strategy.initialize({});

      // Validate the payment details
      await this.strategy.validatePayment(details);

      // Process the payment
      return await this.strategy.processPayment(details);
    } catch (error) {
      // Return a failed payment result if something goes wrong
      return {
        success: false,
        transactionId: `failed_${Date.now()}`,
        timestamp: new Date(),
        status: PaymentStatus.FAILED,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Processes a refund using the current strategy
   * @param transactionId The transaction to refund
   * @param amount Optional amount to refund
   * @throws Error if no strategy is set
   */
  async processRefund(transactionId: string, amount?: number): Promise<PaymentResult> {
    if (!this.strategy) {
      throw new Error('Payment strategy not set');
    }

    try {
      return await this.strategy.refundPayment(transactionId, amount);
    } catch (error) {
      return {
        success: false,
        transactionId: `refund_failed_${transactionId}`,
        timestamp: new Date(),
        status: PaymentStatus.FAILED,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Checks payment status using the current strategy
   * @param transactionId The transaction to check
   * @throws Error if no strategy is set
   */
  async checkStatus(transactionId: string): Promise<PaymentStatus> {
    if (!this.strategy) {
      throw new Error('Payment strategy not set');
    }

    return await this.strategy.getPaymentStatus(transactionId);
  }
}
