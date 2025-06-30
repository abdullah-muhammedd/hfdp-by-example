# Factory Method Pattern - User Management System Example

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 6's Command Pattern in a real-world scenario.

## 🎯 Overview

Instead of using the traditional remote control or macro-command example from Head First Design Patterns, this project implements the **Command Pattern** in the context of an **e-commerce cart system**. It demonstrates how user actions such as adding items, changing quantities, and removing products from a cart can be encapsulated as command objects. This allows for decoupled business logic, supports undo functionality, and promotes a clean, testable architecture using real services like `CartService` and `ProductService`.

## 🏗️ Project Structure

```
7-command-pattern/
src/
├── cart/
│   ├── cart.controller.ts                 # Uses commands to delegate cart actions
│   ├── cart.service.ts                    # Manages cart state and operations
│   ├── commands/                          # ⬅ All cart-related commands live here
│   │   ├── add-item-to-cart.command.ts
│   │   ├── change-quantity.command.ts
│   │   └── remove-item-from-cart.command.ts
│   ├── cart.controller.spec.ts           # ✅ Real integration tests using services + commands
│   └── main.ts                            # Manual runner that invokes controller methods
├── product/
│   └── product.service.ts                 # In-memory product stock logic
├── command-invoker/
│   └── command-invoker.service.ts         # Executes commands + maintains undo history

```

Absolutely! Here's a detailed breakdown in the same format, but for your **Command Pattern–based cart system**:

---

## 🎨 Design Pattern Implementation

### Command Pattern Components:

1. **Command Interface** (`Command`)
   - Declares the interface for executing and undoing operations
   - Methods:
     - `execute(): void`
     - `undo(): void`

2. **Concrete Commands** (located in `cart/commands/`)
   - `AddItemToCartCommand`: Adds a product to the cart and reduces stock
   - `ChangeQuantityCommand`: Changes the quantity of a product in the cart
   - `RemoveItemFromCartCommand`: Removes a product completely and restores stock

3. **Receiver Services**
   - `CartService`: Manages the cart’s internal state (items, add/remove logic)
   - `ProductService`: Manages product stock availability and inventory updates

4. **Invoker** (`CommandInvokerService`)
   - Executes command objects and stores history for undo operations
   - Methods:
     - `execute(command: Command)`
     - `undoLast(): void`
     - `clear(): void`

5. **Client** (`CartController`)
   - Instantiates command objects and delegates them to the invoker
   - Methods:
     - `add(productId, qty)`
     - `changeQuantity(productId, qty)`
     - `remove(productId)`
     - `undoLast()`

6. **Tests and Runner**
   - `cart.controller.spec.ts`: Integration tests validating command behaviors with real services
   - `main.ts`: Manual runner that simulates a full cart usage flow using the controller

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- Node.js 16+ (for TypeScript support)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd 7-command-pattern

# Install dependencies
yarn install
```

### Running the Demo

```bash
# Run the demonstration
yarn dev
```

### Running the test

```bash
# Run the demonstration
yarn test
```

## 💡 Usage Examples

```ts
// Initialize core services
const cartService = new CartService();
const productService = new ProductService();
const commandInvoker = new CommandInvokerService();

// Create the controller (Client)
const cartController = new CartController(cartService, productService, commandInvoker);

// ➕ Add items to the cart
cartController.add('apple', 2);
cartController.add('banana', 3);

// ✏️ Change quantity of an existing item
cartController.changeQuantity('banana', 5);

// 🗑️ Remove an item completely
cartController.remove('apple');

// ↩️ Undo last action (remove apple)
cartController.undoLast();

// 🧾 View cart contents
console.log(cartController.getCart());
```

## 🔍 Key Learning Points

### 1. **Command Pattern Benefits**

- Encapsulates user actions as command objects (add, change, remove)
- Decouples UI/controllers from business logic execution
- Adds support for **undo** functionality and command history
- Promotes single-responsibility and open/closed principles

---

### 2. **Design Considerations**

- Clear separation of **Invoker**, **Commands**, and **Receivers**
- Use of an `Invoker` service to centralize execution and undo logic
- Composability: easy to add new commands like `ClearCartCommand` or `ApplyDiscountCommand`
- Maintains flexibility and testability by isolating logic into command classes

---

### 3. **TypeScript Features Used**

- Interfaces to define the `Command` contract (`execute`, `undo`)
- Classes for concrete command implementations
- `Map` used in `CartService` to track product quantities
- Strong typing for product IDs and quantities throughout services

## 🤝 Contributing

Feel free to use this project as a learning resource or extend it with:

- Additional cart operations (e.g. `ClearCartCommand`, `ApplyDiscountCommand`)
- Support for redo functionality
- Macro commands (batch operations like “Reorder Last Purchase”)
- Persistence layer for cart and command history
- More robust unit and integration tests
- Type-safe DTOs and input validation
- CLI or web UI for user interaction
- Documentation improvements and usage examples

## 📚 Related HFDP Concepts

- **Command Pattern fundamentals**
- **Invoker and Receiver separation**
- **Undo/Redo functionality**
- **Controller as Client**

## 📄 License

MIT
