# Factory Method Pattern - User Management System Example

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 4's Factory Method Pattern (Part 1) in a real-world scenario.

## 🎯 Overview

Instead of using the classic Pizza example from HFDP, this project implements the Factory Method Pattern in a user management system context. It demonstrates how different types of users (Admin, Owner, Viewer) can be created using specialized factories while maintaining a consistent creation interface.

## 🏗️ Project Structure

```
4-factory-method-pattern/
├── user/
│   ├── factory/
│   │   ├── user.factory.ts                    # Abstract factory base class
│   │   ├── admin-user.factory.ts              # Concrete factory for admin users
│   │   ├── owner-user.factory.ts              # Concrete factory for owner users
│   │   └── viewer-user.factory.ts             # Concrete factory for viewer users
│   ├── product/
│   │   ├── admin-user.ts                      # Concrete admin user implementation
│   │   ├── owner-user.ts                      # Concrete owner user implementation
│   │   └── viewer-user.ts                     # Concrete viewer user implementation
│   ├── provider/
│   │   └── user-factory.provider.ts           # Singleton provider for factories
│   ├── types/
│   │   ├── enums/
│   │   │   ├── permissions.enum.ts            # User permissions definitions
│   │   │   └── user-type.enum.ts             # User type definitions
│   │   └── interfaces/
│   │       ├── hookable.interface.ts          # Lifecycle hooks interface
│   │       └── user.interface.ts              # Base user interface
│   ├── repo/
│   │   └── user.repo.ts                       # User repository simulation
│   └── user.service.ts                        # User management service
└── main.ts                                    # Demo implementation
```

## 🎨 Design Pattern Implementation

### Factory Method Pattern Components:

1. **Creator** (`UserFactory`)

   - Abstract base class defining the factory method interface
   - Method: createUser(id, name, email, phone, address)

2. **Concrete Creators**

   - `AdminUserFactory`: Creates admin users
   - `OwnerUserFactory`: Creates owner users
   - `ViewerUserFactory`: Creates viewer users

3. **Product Interface** (`User`)

   - Defines the interface for user objects
   - Extended with `Hookable` for lifecycle management

4. **Concrete Products**
   - `AdminUser`: Users with administrative privileges
   - `OwnerUser`: Users with ownership privileges
   - `ViewerUser`: Users with viewing privileges

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- Node.js 16+ (for TypeScript support)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd 4-factory-method-pattern

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
// Get the factory provider instance
const provider = UserFactoryProvider.getInstance();

// Get specific factory for user type
const adminFactory = provider.getFactory(UserType.ADMIN);
const ownerFactory = provider.getFactory(UserType.OWNER);
const viewerFactory = provider.getFactory(UserType.VIEWER);

// Create different types of users
const adminUser = adminFactory.createUser(id, name, email, phone, address);
const ownerUser = ownerFactory.createUser(id, name, email, phone, address);
const viewerUser = viewerFactory.createUser(id, name, email, phone, address);
```

## 🔍 Key Learning Points

1. **Factory Method Pattern Benefits**

   - Encapsulates object creation logic
   - Provides flexibility in creating different user types
   - Maintains single responsibility principle
   - Enables easy extension for new user types

2. **Design Considerations**

   - Abstract Factory vs Factory Method
   - Singleton pattern for provider
   - Dependency injection in factories

3. **TypeScript Features Used**
   - Abstract classes
   - Interfaces
   - Enums for user types
   - Map for factory registry

## 📝 Notes

### Why Singleton for Provider?

The `UserFactoryProvider` uses the Singleton pattern because:

- Ensures a single point of access to all factories
- Prevents multiple instances of factories
- Maintains consistent factory registry across the application

### Why Dependency Injection for Factories?

The factories are injected into the provider using a Map because:

- Improves testability by allowing mock factories
- Enables easy extension with new factory types
- Provides runtime flexibility in factory configuration
- Follows dependency inversion principle

## 🤝 Contributing

Feel free to use this as a learning resource or extend it with:

- Additional user types
- More sophisticated user creation logic
- Unit tests
- Documentation improvements

## 📚 Related HFDP Concepts

- Factory Method Pattern basics
- Singleton Pattern integration
- Dependency Injection
- Object creation patterns

## 📄 License

MIT
