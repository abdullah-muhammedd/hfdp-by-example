# State Pattern - Webhook Lifecycle Example (HFDP Chapter 10)

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 10's **State Pattern** in a real-world webhook processing context.

## 🎯 Overview

This project implements the State Pattern to model a webhook’s lifecycle. The webhook passes through multiple states—Idle, Verifying, Processing, Completed, or Error—depending on its input and validation. This encapsulates state-specific logic within state objects, avoiding complex conditionals and improving code clarity.

## 🏗️ Project Structure

```
10-state-pattern/
├── src/
│   ├── webhook/
│   │   ├── state/
│   │   │   ├── types/
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── webhook-state.interface.ts
│   │   │   │   └── webhook-input.type.ts
│   │   │   ├── idle.state.ts
│   │   │   ├── verifying.state.ts
│   │   │   ├── completed.state.ts
│   │   │   ├── processing.state.ts
│   │   │   └── error.state.ts
│   │   ├── webhook.context.ts
│   │   ├── webhook.controller.ts
│   │   └── webhook.service.ts
│   └── main.ts
├── test/
│   └── webhook.e2e.spec.ts
└── README.md
```

## 🎨 State Pattern Implementation

### Context: `WebhookContext`

- Holds the current state object
- Accepts `WebhookInput` (headers + body)
- Delegates `handle()` to the current state
- Handles `transitionTo()` to switch states internally

### State Interface: `WebhookState`

```ts
interface WebhookState {
  getName(): string;
  handle(context: WebhookContext): Promise<void>;
}
```

### Concrete States:

1. **IdleState**: Validates initial input and starts processing
2. **VerifyingState**: Verifies webhook signature (e.g., via header)
3. **ProcessingState**: Applies business logic (e.g., event routing)
4. **CompletedState**: Final step after successful handling
5. **ErrorState**: Captures and logs failed scenarios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- Bun

### Installation

```bash
# Clone the repository
# cd 12-state-pattern
# Install dependencies
yarn install
```

### Running the App

```bash
yarn dev
```

- The Express server runs on `http://localhost:3000`
- Webhooks can be sent via POST to `/webhook`

### Running End-to-End Tests

```bash
yarn test:e2e
```

- Sends actual requests to the webhook controller
- Validates transitions through Idle → Verifying → Processing → Completed/Error

## 💡 Key Learning Points

- **State Pattern**: Encapsulates state logic and transitions
- **Single Responsibility**: Each state focuses on one purpose
- **Encapsulation**: Reduces branching in `WebhookContext`
- **Extendability**: New states can be added without touching existing logic

## 📝 Notes

- This is a simulation of a webhook processing system
- Signature validation is mocked for demonstration
- Real production hooks should include authentication, retries, and persistence

## 📚 Related HFDP Concepts

- State Pattern basics
- Behavioral patterns
- Avoiding conditional complexity
- Encapsulation of state-specific logic

## 📄 License

MIT
