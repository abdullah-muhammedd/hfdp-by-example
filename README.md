# Head First Design Patterns – By Example (A real one)

## 📖 Introduction

This repository documents my personal journey through **Head First Design Patterns (HFDP)**.

Instead of sticking to the classic, simplified examples from the book, I intentionally **ignore them entirely** and replace them with **real-world problems**—things I’ve actually faced in my work or was curious to explore.

The goal isn’t to “overcomplicate” for its own sake, but to:

* **Understand each pattern deeply** by applying it where design decisions genuinely matter.
* **Build realistic, maintainable examples** that could exist in production-grade systems.
* **Bridge the gap between theory and practice**, turning abstract design concepts into concrete, working code.

Every chapter demonstrates:

* The **core idea** of the pattern.
* A **practical use case** that justifies its existence.
* How the pattern fits into **real backend engineering problems**, not toy simulations.




## My HFDP Pattern Implementations – Real‑World Case Studies

| Pattern Name                  | Directory                        | Implementation Idea                                                                                                                                    | Definition (from HFDP)                                                                                                                                                                      |
| ----------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Strategy Pattern              | `1-strategy-pattern/`            | Payment processing system with pluggable providers (Stripe, Paymob) allowing runtime switching.                                                                   | Defines a family of algorithms, encapsulates each one, and makes them interchangeable.                                                                                                      |
| Observer Pattern              | `2-observer-pattern/`            | Event monitoring system where multiple notification channels (Email, SMS, Logging) subscribe to and receive updates about system events.                          | Defines a one‑to‑many dependency so that when one object changes state, all its dependents are notified and updated.                                                                        |
| Decorator Pattern             | `3-decorator-pattern/`           | Notification system where behaviors like logging, rate‑limiting, and retry can be dynamically added to providers without modifying their core implementation.     | Attaches additional responsibilities to an object dynamically. Provides a flexible alternative to subclassing.                                                                              |
| Factory Method Pattern        | `4-factory-method-pattern/`      | User management system where different user types (Admin, Owner, Viewer) are created via specialized factories under a common creation interface.                 | Defines an interface for creating an object, but lets subclasses decide which class to instantiate.                                                                                         |
| Abstract Factory Pattern      | `5-abstract-factory-pattern/`    | Job management system where families of related components (processors, runners, serializers) for RabbitMQ or BullMQ are created by concrete factories.           | Provides an interface for creating families of related or dependent objects without specifying their concrete classes.                                                                      |
| Command Pattern               | `7-command-pattern/`             | E‑commerce cart system where add/change/remove actions are encapsulated as command objects, enabling undo/redo and decoupling controllers from business logic.    | Encapsulates a request as an object, letting you parameterize clients with requests, queue or log them, and support undo.                                                                   |
| Adapter Pattern               | `8-adapter-pattern/`             | Report generation system adapting a new PDF provider (v2) to an existing DOCX interface (v1) without changing client code—enabling backward compatibility.        | Converts the interface of a class into another interface clients expect, allowing incompatible classes to work together.                                                                    |
| Facade Pattern                | `9-facade-pattern/`              | Centralized observation & reporting API (`ObservationFacade`) that coordinates logging, notifications, events, reports, and audits behind a single interface.     | Provides a unified interface to a set of interfaces in a subsystem, making it easier to use.                                                                                                |
| Template Method Pattern       | `10-template-method-pattern/`    | ETL pipeline where an abstract `FileETLJob` defines the extract→transform→clean→load workflow and subclasses (`CsvETLJob`, `ExcelETLJob`) implement extraction.   | Defines the skeleton of an algorithm in a method, deferring some steps to subclasses.                                                                                                       |
| Composite & Iterator Patterns | `11-composite-iterator-pattern/` | ETL pipeline composed of `Executable` jobs, with `PipelineJob` as a composite and depth‑first iteration to execute each job uniformly.                            | **Composite:** Composes objects into tree structures to represent part‑whole hierarchies. **Iterator:** Provides a way to access elements sequentially without exposing the representation. |
| State Pattern                 | `12-state-pattern/`              | Webhook lifecycle manager where each state (Idle, Verifying, Processing, Completed, Error) encapsulates its own behavior and transitions.                         | Allows an object to alter its behavior when its internal state changes; the object appears to change its class.                                                                             |
| Proxy Pattern                 | `13-proxy-pattern/`              | Video processing API combining **Protection Proxy** (API key & quota enforcement), **Virtual Proxy** (lazy user & API key creation), and **Remote Proxy** (HTTP). | Provides a surrogate or placeholder for another object to control access to it, add behavior, or delay its creation.                                                                        |

# Principles learned from the book

| Principle                                             | Description                                                                                                                                                          |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single Responsibility Principle (SRP)                 | A class (or module) should have one, and only one, reason to change—i.e., it should have only one responsibility or job.                                             |
| Keep It Simple, Stupid (KISS)                         | Favor simplicity by avoiding unnecessary complexity. Simple designs are easier to understand, test, and maintain.                                                    |
| Hollywood Principle (“Don’t call us, we’ll call you”) | Design to **inversion of control**: lower‑level components register or plug into higher‑level frameworks, which drive the flow rather than hard‑coding direct calls. |
| Identify what varies and encapsulate it               | Find the parts of your application that change and separate them into their own classes or modules so changes don’t ripple through unrelated code.                   |
| Program to an interface, not an implementation        | Depend on abstract interfaces or base classes instead of concrete classes, enabling polymorphism and reducing coupling between clients and implementations.          |
| Strive for loosely coupled designs                    | Minimize direct dependencies by using interfaces, delegates, or design patterns so objects can be modified or replaced without impacting each other.                 |
| Open–Closed Principle                                 | Classes should be open for extension but closed for modification—new behavior gets added by extending, not by altering tested, existing code.                        |
| Favor object composition over class inheritance       | Build complex behavior by combining simple objects at runtime rather than imposing behavior through rigid inheritance hierarchies.                                   |
| Dependency Inversion Principle                        | Depend upon abstractions, not concretions: both high‑ and low‑level modules should rely on shared interfaces, not on each other’s concrete implementations.          |
| Encapsulate what varies                               | Wherever variation occurs—algorithms, formats, protocols—wrap it behind an interface so changes stay localized.                                                      |
| Keep objects loosely coupled                          | Use indirection (e.g., proxies, adapters) and well‑defined interfaces to avoid tight binding between classes and promote independent evolution.                      |


# Used tools

* **Languages & Runtimes**

  * TypeScript
  * Node.js

* **Frameworks & Core Libraries**

  * NestJS (controllers, modules, dependency injection)
  * Express (underlying HTTP server in some demos)

* **HTTP & Networking**

  * Axios (client‑side API calls)

* **File Handling & Streaming**

  * fs / fs.promises (Node.js built‑in)
  * Multer (NestJS file interceptor)
  * csv‑parse (streaming CSV parsing)
  * exceljs or xlsx (for Excel ETL jobs)

* **Video Processing**

  * FFmpeg (via command‑line or fluent‑ffmpeg)

* **Data Modeling & Persistence**

  * PostgreSQL
  * RabbitMQ
  * BullMQ (uses redis)
  * Prisma (ORM for ETL template‑method example)
  * In‑memory Repositories / Maps (simpler demos)

* **Testing**

  * Jest (unit & e2e tests)
  * Supertest (HTTP integration tests)

* **Validation & DTOs**

  * class‑validator / class‑transformer (request validation)

* **Utilities & Other**

  * bun (optional for scripts)
  * Docker & docker‑compose (PostgreSQL for ETL demo)
  * Swagger (OpenAPI docs for Adapter & Facade examples)

* **CLI & Tooling**

  * Prettier / ESLint (code formatting & linting)

## Final Thoughts

I’ll be honest—building out all these real‑world examples took a ton of time and effort on top of juggling my full‑time jobs. But it was absolutely worth it. Along the way I:

* Deepened my understanding of each pattern by solving problems I actually care about.
* Learned new tools and techniques (NestJS, FFmpeg, Prisma, streaming I/O, and more).
* Put these designs to use at work, where colleagues now rely on my clear diagrams and modular architectures.

Above all, I had fun. Every “aha!” moment—wiring up a virtual proxy, crafting a clean facade, or watching a command pattern undo itself—reinforced why good design matters. I hope you find these examples as useful (and enjoyable) as I did, whether you’re learning patterns for the first time or applying them on the job.

Happy coding!


# Note
All these READMEs were lovingly crafted by my two silent sidekicks—GPT and Gemini—so I didn’t have to pull an all‑nighter fixing typos. They handle the typos, I handle the coffee! ☕🤖✨ (even this note is freshly generated by gpt )








