# Facade Pattern - Observation & Reporting Example (HFDP Chapter 7, Part 2)

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 7's **Facade Pattern** in a real-world system observation and reporting context.

## 🎯 Overview

Instead of the classic home theater example from HFDP, this project implements the Facade Pattern to provide a centralized API for reporting and observing system events, logs, notifications, reports, and audits. The `ObservationFacade` coordinates multiple specialized services, making it easy to plug in new backends or change reporting logic without affecting client code.

## 🏗️ Project Structure

```
9-facade-pattern/
├── src/
│   ├── modules/
│   │   ├── api/
│   │   │   ├── payment/
│   │   │   │   ├── payment.controller.ts
│   │   │   │   ├── payment.route.ts
│   │   │   │   └── payment.service.ts
│   │   │   └── user/
│   │   │       ├── user.controller.ts
│   │   │       ├── user.route.ts
│   │   │       └── user.service.ts
│   │   └── observation/
│   │       ├── facade/
│   │       │   └── observation-facade.ts
│   │       └── services/
│   │           ├── audit.service.ts
│   │           ├── event.service.ts
│   │           ├── log.service.ts
│   │           ├── notification.service.ts
│   │           └── report.service.ts
│   ├── types/  # All shared types (one per file, kebab-case)
│   ├── constants/
│   └── main.ts
├── reports/    # All generated reports and audit logs
├── swagger.yaml
└── README.md
```

## 🎨 Facade Pattern Implementation

### Facade: `ObservationFacade`

- Exposes a single method: `report(options)`
- Accepts a flexible options object to log, notify, emit events, generate reports, and write audit logs
- Internally delegates to specialized services:
  - **NotificationService**: Email/SMS notifications
  - **LogService**: Console/file logging with color and levels
  - **EventService**: Typed event emitter for system events
  - **ReportService**: Writes text reports to `reports/` (kebab-case filenames)
  - **AuditService**: Appends audit logs to `reports/audit-log.log`

### Example Usage

```typescript
await ObservationFacade.report({
  log: { level: 'error', message: 'Charge failed for user #123', context: 'BillingService' },
  notification: {
    channel: 'email',
    to: 'user123@example.com',
    message: 'Payment failed',
    subject: 'Payment Error',
  },
  event: { key: 'PaymentFailure', payload: { userId: 123, reason: 'Insufficient funds' } },
  report: {
    reportName: 'payment-failure',
    content: 'Charge failed for user #123',
    tags: ['billing', 'critical'],
    createdAt: new Date(),
  },
  audit: { userId: 123, action: 'PaymentFailure', details: { amount: 100 }, timestamp: new Date() },
});
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- Yarn

### Installation

```bash
# Clone the repository
# cd 9-facade-pattern
# Install dependencies
yarn install
```

### Running the App

```bash
yarn dev
```

- The API is available at `http://localhost:3000`
- Swagger docs: `http://localhost:3000/api-docs`
- Reports and audit logs are written to the `reports/` directory

## 💡 Key Learning Points

- **Facade Pattern**: Simplifies complex subsystems (logging, notification, reporting, auditing) behind a single API
- **Plug-and-Play**: Easily add/replace notification, logging, or reporting backends
- **Type Safety**: All options and events are strongly typed
- **Separation of Concerns**: Each service is testable and replaceable
- **Real-World Application**: Centralized observation/reporting is common in production systems

## 📝 Notes

- This is a simulated implementation for learning purposes
- Real integrations (email, SMS, analytics, etc.) would require actual APIs
- All file writes are relative to the project root (`reports/`)
- Swagger docs are maintained in `swagger.yaml`

## 📚 Related HFDP Concepts

- Facade Pattern basics
- Encapsulation of subsystems
- Clean API design
- Plug-in architecture

## 📄 License

MIT
