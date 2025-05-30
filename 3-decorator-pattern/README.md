# Decorator Pattern - Notification System Example

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 3's Decorator Pattern in a real-world scenario.

## 🎯 Overview

Instead of using the classic Beverage/Coffee example from HFDP, this project implements the Decorator Pattern in a notification system context. It demonstrates how different behaviors (logging, rate limiting, retry logic) can be dynamically added to notification providers without changing their core implementation.

## 🏗️ Project Structure

```
3-decorator-pattern/
├── types/
│   ├── interfaces/
│   │   └── notification-provider.interface.ts  # Base component interface
│   └── errors/
│       ├── rate-limit.error.ts                # Custom error for rate limiting
│       └── simulation.error.ts                # Custom error for simulations
├── provider/
│   ├── email-notification.provider.ts         # Concrete email provider
│   ├── sms-notification.provider.ts           # Concrete SMS provider
│   └── whatsapp-notification.provider.ts      # Concrete WhatsApp provider
├── decorator/
│   ├── logging.decorator.ts                   # Adds logging capability
│   ├── rate-limit.decorator.ts                # Adds rate limiting
│   ├── retry-on-fail.decorator.ts             # Adds retry logic
│   └── error-simulation.decorator.ts          # Simulates failures
├── service/
│   └── notification.service.ts                # Service using decorators
├── builder/
│   └── notification-provider.builder.ts       # Builder for decorator chains
└── main.ts                                    # Demo implementation
```

## 🎨 Design Pattern Implementation

### Decorator Pattern Components:

1. **Component Interface** (`NotificationProvider`)

   - Defines the contract for all providers and decorators
   - Method: sendNotification(message: string)

2. **Concrete Components**

   - `EmailNotificationProvider`: Basic email notifications
   - `SMSNotificationProvider`: Basic SMS notifications
   - `WhatsAppNotificationProvider`: Basic WhatsApp notifications

3. **Decorators**

   - `LoggingDecorator`: Adds logging before/after sending
   - `RateLimitDecorator`: Prevents notification spam
   - `RetryOnFailDecorator`: Automatically retries failed attempts
   - `ErrorSimulationDecorator`: Simulates failures (for testing)

4. **Builder**
   - `NotificationProviderBuilder`: Fluent interface for decorator composition

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- Node.js 16+ (for TypeScript support)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd 3-decorator-pattern

# Install dependencies
bun install
```

### Running the Demo

```bash
# Run the demonstration
bun run main.ts
```

## 💡 Usage Examples

```typescript
// Create a basic provider
const emailProvider = new EmailNotificationProvider();

// Create a provider with single decorator
const loggedProvider = new NotificationProviderBuilder(emailProvider).addLogging().build();

// Create a provider with multiple decorators
const reliableProvider = new NotificationProviderBuilder(emailProvider)
  .addLogging()
  .addRateLimit()
  .addRetry()
  .build();

// Use the decorated provider
const notificationService = new NotificationService(reliableProvider);
await notificationService.sendNotification('Hello, World!');
```

## 🔍 Key Learning Points

1. **Decorator Pattern Benefits**

   - Dynamic addition of behaviors
   - Alternative to subclassing
   - Single Responsibility Principle
   - Open/Closed Principle

2. **Real-World Applications**

   - Logging and monitoring
   - Rate limiting
   - Retry mechanisms

3. **TypeScript Features Used**
   - Interfaces for component contract
   - Class inheritance for decorators
   - Builder pattern integration
   - Async/await for operations

## 📝 Notes

- This is a demonstration implementation
- Real notification systems would need actual provider integrations
- Rate limiting uses simple time-based approach
- Error simulation is included for testing purposes

## 🤝 Contributing

Feel free to use this as a learning resource or extend it with:

- Additional decorators
- Real notification integrations
- More sophisticated rate limiting
- Unit tests
- Documentation improvements

## 📚 Related HFDP Concepts

- Decorator Pattern basics
- Open/Closed Principle
- Single Responsibility Principle
- Object composition (and delegation) vs inheritance

## 📄 License

MIT
