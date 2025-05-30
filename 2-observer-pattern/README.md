# Observer Pattern - Event Monitoring System Example

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 2's Observer Pattern in a real-world scenario.

## 🎯 Overview

Instead of using the classic WeatherStation example from HFDP, this project implements the Observer Pattern in an event monitoring context, which is a common real-world use case. It demonstrates how different notification methods (Email, SMS, Logging) can subscribe to and receive updates about system events.

## 🏗️ Project Structure

```
2-observer-pattern/
├── types/
│   ├── interfaces/
│   │   └── observer.interface.ts      # Observer interface
│   └── event.type.ts                  # Event structure definition
├── providers/
│   ├── email-event-notifier.ts        # Email notification implementation
│   ├── sms-event-notifier.ts          # SMS notification implementation
│   └── logging-event-notifier.ts      # Logging implementation
├── service/
│   ├── events.service.ts              # Subject managing observers
│   └── user.service.ts                # Service generating events
└── main.ts                            # Demo implementation
```

## 🎨 Design Pattern Implementation

### Observer Pattern Components:

1. **Observer Interface** (`ObserverInterface`)

   - Defines the contract for all observers
   - Methods: update(event: Event)

2. **Concrete Observers**

   - `EmailEventNotifier`: Handles email notifications
   - `SMSEventNotifier`: Handles SMS alerts
   - `LoggingEventNotifier`: Handles system logging

3. **Subject** (`EventsService`)
   - Maintains list of observers
   - Methods for subscribe/unsubscribe
   - Notifies observers of events

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- Node.js 16+ (for TypeScript support)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd 2-observer-pattern

# Install dependencies
yarn install
```

### Running the Demo

```bash
# Run the demonstration
yarn dev
```

## 💡 Usage Examples

```typescript
// Create the events service and observers
const eventsService = new EventsService();
const emailObserver = new EmailEventNotifier('admin@example.com');
const smsObserver = new SMSEventNotifier('+1234567890');
const loggingObserver = new LoggingEventNotifier();

// Subscribe observers
eventsService.subscribe(emailObserver);
eventsService.subscribe(smsObserver);
eventsService.subscribe(loggingObserver);

// Create service that generates events
const userService = new UserService(eventsService);

// Simulate events
userService.simulateUserLogin('user123');
userService.simulateFailedLogin('hacker', 5);

// Unsubscribe an observer
eventsService.unsubscribe(smsObserver);
```

## 🔍 Key Learning Points

1. **Observer Pattern Benefits**

   - Loose coupling between subject and observers
   - Dynamic subscription/unsubscription
   - One-to-many relationship management
   - Real-time event notification

2. **Real-World Application**

   - Event monitoring is a perfect use case for the Observer pattern
   - Different notification methods can be added easily
   - Observers can be added/removed at runtime

3. **TypeScript Features Used**
   - Interfaces for observer pattern
   - Type definitions for events
   - Dependency injection
   - Event handling with type safety

## 📝 Notes

- This is a simulated implementation for learning purposes
- Real notification systems would require actual email/SMS integrations
- Event handling and validation are simplified
- Comments in the code indicate where to add real implementation logic

## 🤝 Contributing

Feel free to use this as a learning resource or extend it with:

- Additional notification methods
- Real notification service integrations
- More comprehensive event handling
- Unit tests
- Documentation improvements

## 📚 Related HFDP Concepts

- Observer Pattern basics
- Loose coupling
- Publisher/Subscriber model
- Event-driven programming

## 📄 License

MIT
