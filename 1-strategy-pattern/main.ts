import { PaymentService } from './service/payment.service';
import { StripePaymentStrategy } from './strategy/stripe-payment.strategy';
import { PaymobPaymentStrategy } from './strategy/paymob-payment.strategy';
import { PaymentStatus } from './types/enum/payment-status.enum';

// Utility function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function demonstratePaymentStrategies() {
  console.clear();
  console.log('🚀 Starting Payment Strategy Demo\n');

  // Create service and strategies
  const paymentService = new PaymentService();
  const stripeStrategy = new StripePaymentStrategy();
  const paymobStrategy = new PaymobPaymentStrategy();

  // Demo 1: Stripe Payment
  console.log('💳 Testing Stripe Payment Strategy:');
  console.log('----------------------------------');
  paymentService.setStrategy(stripeStrategy);

  try {
    await delay(1000); // Simulate network delay
    const stripePayment = await paymentService.processPayment({
      amount: 99.99,
      currency: 'USD',
      description: 'Premium Subscription',
      metadata: {
        customerId: 'CUST_123',
        plan: 'premium',
      },
    });

    console.log('\nStripe Payment Result:');
    console.log(JSON.stringify(stripePayment, null, 2));

    if (stripePayment.success) {
      await delay(500);
      const status = await paymentService.checkStatus(stripePayment.transactionId);
      console.log('\nPayment Status:', status);

      if (status === PaymentStatus.COMPLETED) {
        console.log('\n💰 Testing Stripe Refund:');
        console.log('----------------------');
        await delay(1000);
        const refund = await paymentService.processRefund(stripePayment.transactionId);
        console.log('\nRefund Result:');
        console.log(JSON.stringify(refund, null, 2));
      }
    }
  } catch (error) {
    console.error(
      '\n❌ Stripe Payment Error:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }

  // Demo 2: Paymob Payment
  console.log('\n\n💳 Testing Paymob Payment Strategy:');
  console.log('-----------------------------------');
  paymentService.setStrategy(paymobStrategy);

  try {
    await delay(1000);
    const paymobPayment = await paymentService.processPayment({
      amount: 1500,
      currency: 'EGP',
      description: 'Electronics Purchase',
      metadata: {
        orderId: 'ORD_456',
        store: 'Cairo Branch',
      },
    });

    console.log('\nPaymob Payment Result:');
    console.log(JSON.stringify(paymobPayment, null, 2));

    if (paymobPayment.success) {
      await delay(500);
      const status = await paymentService.checkStatus(paymobPayment.transactionId);
      console.log('\nPayment Status:', status);

      if (status === PaymentStatus.COMPLETED) {
        console.log('\n💰 Testing Paymob Partial Refund:');
        console.log('------------------------------');
        await delay(1000);
        const refund = await paymentService.processRefund(paymobPayment.transactionId, 500);
        console.log('\nPartial Refund Result:');
        console.log(JSON.stringify(refund, null, 2));
      }
    }
  } catch (error) {
    console.error(
      '\n❌ Paymob Payment Error:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }

  // Demo 3: Error Handling
  console.log('\n\n❌ Testing Error Handling:');
  console.log('-------------------------');
  try {
    await delay(500);
    console.log('\nAttempting payment with invalid amount (-100):');
    await paymentService.processPayment({
      amount: -100,
      currency: 'USD',
    });
  } catch (error) {
    console.log(
      '\n✓ Expected Error Caught:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }

  // Demo 4: Strategy Switching
  console.log('\n\n🔄 Testing Strategy Switching:');
  console.log('--------------------------');
  await delay(500);
  console.log('\nCurrent Strategy:', paymentService.getStrategy()?.constructor.name);
  paymentService.setStrategy(stripeStrategy);
  console.log('After Switch:', paymentService.getStrategy()?.constructor.name);
}

// Run the demo
console.log('Starting payment demo...');
demonstratePaymentStrategies().catch((error) => {
  console.error('\n❌ Demo Failed:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});
