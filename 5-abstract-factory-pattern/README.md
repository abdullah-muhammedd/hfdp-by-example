# Abstract Factory Pattern - Job Management System Example

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 4's Part 2 Abstract Factory Pattern in a real-world scenario.

## 🎯 Overview

Instead of using the classic Pizza example from HFDP, this project implements the Abstract Factory Pattern in a job management system context. It demonstrates how different types of job providers (RabbitMQ, BullMQ) can be created using specialized factories while maintaining a consistent creation interface.

## 🏗️ Project Structure

```
5-abstract-factory-pattern/
├── job-provider/
│   ├── rabbit-mq/
│   │   ├── rabbit-mq.factory.ts              # Factory for RabbitMQ job provider
│   │   ├── rabbit-mq.processor.ts            # Job processor for RabbitMQ
│   │   ├── rabbit-mq.runner.ts               # Job runner for RabbitMQ
│   │   └── rabbit-mq.serializer.ts           # Job serializer for RabbitMQ
│   ├── bull-mq/
│   │   ├── bull-mq.factory.ts                # Factory for BullMQ job provider
│   │   ├── bull-mq.processor.ts              # Job processor for BullMQ
│   │   ├── bull-mq.runner.ts                 # Job runner for BullMQ
│   │   └── bull-mq.serializer.ts             # Job serializer for BullMQ
│   ├── types/
│   │   ├── enums/
│   │   │   ├── job-type.enum.ts              # Job type definitions
│   │   └── interfaces/
│   │       ├── job-processor.interface.ts    # Interface for job processors
│   │       ├── job-runner.interface.ts       # Interface for job runners
│   │       └── job-serializer.interface.ts   # Interface for job serializers
|   ├──biling.service.ts                      # the service that uses a specific provider to handles jobs processing
|   |
└── main.ts                                   # Demo implementation
```

## 🎨 Design Pattern Implementation

### Abstract Factory Pattern Components:

1. **Abstract Factory** (`JobFactory`)

   - Defines the interface for creating job-related components
   - Methods: createProcessor(), createRunner(), createSerializer()

2. **Concrete Factories**

   - `RabbitMQFactory`: Creates RabbitMQ job components
   - `BullMQFactory`: Creates BullMQ job components

3. **Product Interfaces**

   - `JobProcessorInterface`: Interface for job processors
   - `JobRunnerInterface`: Interface for job runners
   - `JobSerializerInterface`: Interface for job serializers

4. **Concrete Products**
   - `RabbitMQProcessor`, `RabbitMQRunner`, `RabbitMQSerializer`: RabbitMQ-specific implementations
   - `BullMQProcessor`, `BullMQRunner`, `BullMQSerializer`: BullMQ-specific implementations

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- Node.js 16+ (for TypeScript support)
- Redis installed and running (for BullMQ)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd 5-abstract-factory-pattern

# Install dependencies
yarn install
```

### Running the Demo

```bash
# Run the demonstration
yarn dev
```

### Running the integration tests

```bash
# Run the demonstration
yarn test
```

## 💡 Usage Examples

```typescript
// Get the factory provider instance
const provider = JobFactoryProvider.getInstance();

// Get specific factory for job type
const rabbitFactory = provider.getFactory(JobType.RABBITMQ);
const bullFactory = provider.getFactory(JobType.BULLMQ);

// Create job components
const rabbitProcessor = rabbitFactory.createProcessor();
const bullProcessor = bullFactory.createProcessor();

const rabbitRunner = rabbitFactory.createRunner();
const bullRunner = bullFactory.createRunner();

const rabbitSerializer = rabbitFactory.createSerializer();
const bullSerializer = bullFactory.createSerializer();
```

## 🔍 Key Learning Points

1. **Abstract Factory Pattern Benefits**

   - Encapsulates creation logic for related objects
   - Provides flexibility in supporting multiple job providers
   - Maintains single responsibility principle
   - Enables easy extension for new job providers

## 🤝 Contributing

Feel free to use this as a learning resource or extend it with:

- Additional job providers
- More sophisticated job processing logic
- Unit tests
- Documentation improvements

## 📚 Related HFDP Concepts

- Abstract Factory Pattern basics
- Dependency Injection
- Object creation patterns
- Open closed principle
- DDependency inversion principle

## 📄 License

MIT
