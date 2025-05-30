# Strategy Pattern - Payment Processing Example

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 1's Strategy Pattern in a real-world scenario.

## 🎯 Overview

Instead of using the classic Duck example from HFDP, this project implements the Strategy Pattern in a payment processing context, which is a common real-world use case. It demonstrates how different payment providers (Stripe, Paymob) can be swapped at runtime without changing the client code.

## 🏗️ Project Structure

```
1-strategy-pattern/
├── types/
│   ├── enum/
│   │   └── payment-status.enum.ts     # Payment status definitions
│   ├── interfaces/
│   │   └── payment-strategy.interface.ts  # Strategy interface
│   ├── payment-details.type.ts        # Payment request structure
│   └── payment-result.type.ts         # Payment response structure
├── strategy/
│   ├── stripe-payment.strategy.ts     # Stripe implementation
│   └── paymob-payment.strategy.ts     # Paymob implementation
├── service/
│   └── payment.service.ts             # Context class using strategies
└── main.ts                           # Demo implementation
```

## 🎨 Design Pattern Implementation

### Strategy Pattern Components:

1. **Strategy Interface** (`PaymentStrategy`)

   - Defines the contract for all payment strategies
   - Methods: initialize, processPayment, validatePayment, refundPayment, getPaymentStatus

2. **Concrete Strategies**

   - `StripePaymentStrategy`: Simulates Stripe payment processing
   - `PaymobPaymentStrategy`: Simulates Paymob payment processing

3. **Context** (`PaymentService`)
   - Uses the selected strategy
   - Can switch strategies at runtime
   - Handles common error scenarios

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- Node.js 16+ (for TypeScript support)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd 1-strategy-pattern

# Install dependencies
yarn install
```

### Running the Demo

```bash
# Run the demonstration
yarn deev
```

## 💡 Usage Examples

```typescript
// Create payment service and strategies
const paymentService = new PaymentService();
const stripeStrategy = new StripePaymentStrategy();
const paymobStrategy = new PaymobPaymentStrategy();

// Process payment with Stripe
paymentService.setStrategy(stripeStrategy);
const stripePayment = await paymentService.processPayment({
  amount: 99.99,
  currency: 'USD',
  description: 'Premium Subscription',
});

// Switch to Paymob and process another payment
paymentService.setStrategy(paymobStrategy);
const paymobPayment = await paymentService.processPayment({
  amount: 1500,
  currency: 'EGP',
  description: 'Electronics Purchase',
});
```

## 🔍 Key Learning Points

1. **Strategy Pattern Benefits**

   - Easy to add new payment providers
   - Runtime strategy switching
   - Encapsulated provider-specific logic
   - Clean separation of concerns

2. **Real-World Application**

   - Payment processing is a perfect use case for the Strategy pattern
   - Different providers have different requirements but similar interfaces
   - Easy to maintain and extend

3. **TypeScript Features Used**
   - Interfaces for strategy pattern
   - Type definitions for payment data
   - Enums for payment status
   - Error handling with type guards

## 📝 Notes

- This is a simulated implementation for learning purposes
- Real payment processing would require actual API integrations
- Error handling and validation are simplified
- Comments in the code indicate where to add real implementation logic

## 🤝 Contributing

Feel free to use this as a learning resource or extend it with:

- Additional payment providers
- Real API integrations
- More comprehensive error handling
- Unit tests
- Documentation improvements

## 📚 Related HFDP Concepts

- Strategy Pattern basics
- Composition over inheritance
- Programming to an interface
- Encapsulating varying behavior

## 📄 License

MIT
