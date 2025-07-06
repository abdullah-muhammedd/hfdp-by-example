# Adapter Pattern - Report Generation System Example

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 7's Adapter Pattern in a real-world scenario.

## 🎯 Overview

Instead of using the traditional duck/turkey example from Head First Design Patterns, this project implements the **Adapter Pattern** in the context of a **report generation system**. It demonstrates how to adapt a new PDF report provider (v2) to work with an existing DOCX report interface (v1) without changing the client code. This allows for seamless integration of new functionality while maintaining backward compatibility.

## 🏗️ Project Structure

```
8-adapter-pattern/
├── api/
│   ├── v1/
│   │   ├── reports/
│   │   │   ├── providers/
│   │   │   │   └── reports.providers.ts      # Legacy DOCX provider
│   │   │   ├── adapters/
│   │   │   │   └── v2-provider.adapter.ts    # ⬅ Adapter for v2 provider
│   │   │   ├── reports.controller.ts
│   │   │   └── reports.service.ts
│   │   └── types/
│   │       └── interfaces/
│   │           └── reports-providers.interface.ts
│   └── v2/
│       ├── reports/
│       │   ├── providers/
│       │   │   └── reports.providers.ts      # New PDF provider
│       │   ├── reports.controller.ts
│       │   └── reports.service.ts
│       └── types/
│           └── interfaces/
│               └── reports-providers.interface.ts
├── main.ts                                   # Express app with all API variants
├── swagger.yaml                              # OpenAPI documentation
└── tests/
    └── e2e/                                 # End-to-end tests for all scenarios
```

## 🎨 Design Pattern Implementation

### Adapter Pattern Components:

1. **Target Interface** (`ReportsProvider` in v1)
   - Defines the expected interface for report generation
   - Methods:
     - `generateReport(data: ReportData): Promise<string>`
     - `getReportFormat(): ReportFormat`

2. **Adaptee** (`ReportsProvider` in v2)
   - The new interface that needs to be adapted
   - Advanced PDF functionality with many methods:
     - `generatePDFReport(data: ReportData): Promise<string>`
     - `getPDFFormat(): PDFFormat`
     - `applyTemplate(template: string): void`
     - `setEncryption(password: string): void`
     - `scheduleGeneration(schedule: Schedule): void`
     - And many more advanced PDF features

3. **Adapter** (`V2ProviderAdapter`)
   - Wraps the v2 provider and adapts its interface to match v1
   - Implements the v1 `ReportsProvider` interface
   - Delegates calls to the v2 provider while maintaining compatibility

4. **Client** (`ReportsController` and `ReportsService`)
   - Uses the target interface without knowing about the adapter
   - Can work with both legacy provider and adapted v2 provider

5. **API Variants**
   - `/api/v1/reports`: Uses legacy DOCX provider
   - `/api/v2/reports`: Uses new PDF provider directly
   - `/api/v1-with-v2/reports`: Uses v2 provider through adapter

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ with TypeScript support
- Express.js for the web server

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd 8-adapter-pattern

# Install dependencies
yarn install
```

### Running the Application

```bash
# Run the demonstration
yarn dev
```

The server will start on `http://localhost:3000` with the following endpoints:

- **Legacy API**: `POST/GET /api/v1/reports` (DOCX reports)
- **New API**: `POST/GET /api/v2/reports` (PDF reports with advanced features)
- **Adapted API**: `POST/GET /api/v1-with-v2/reports` (PDF reports via adapter)
- **Documentation**: `GET /docs` (Swagger UI)

### Running Tests

```bash
# Run end-to-end tests
yarn test
```

## 💡 Usage Examples

### Using Legacy Provider (DOCX)

```bash
# Generate DOCX report
curl -X POST http://localhost:3000/api/v1/reports \
  -H "Content-Type: application/json" \
  -d '{"title": "Monthly Report", "content": "Sales data", "date": "2024-01-15"}'

# Get report format
curl http://localhost:3000/api/v1/reports
```

### Using New Provider (PDF)

```bash
# Generate PDF report with advanced features
curl -X POST http://localhost:3000/api/v2/reports \
  -H "Content-Type: application/json" \
  -d '{"title": "Advanced Report", "content": "Detailed analysis", "date": "2024-01-15"}'

# Get PDF format
curl http://localhost:3000/api/v2/reports
```

### Using Adapter (PDF via v1 interface)

```bash
# Generate PDF report using v1 interface
curl -X POST http://localhost:3000/api/v1-with-v2/reports \
  -H "Content-Type: application/json" \
  -d '{"title": "Adapted Report", "content": "PDF via adapter", "date": "2024-01-15"}'

# Get format (returns PDF format)
curl http://localhost:3000/api/v1-with-v2/reports
```

## 🔍 Key Learning Points

### 1. **Adapter Pattern Benefits**

- **Backward Compatibility**: New functionality can be used with existing interfaces
- **Client Isolation**: Client code doesn't need to change when switching providers
- **Gradual Migration**: Can gradually migrate from old to new system
- **Interface Translation**: Converts one interface to another seamlessly

### 2. **Design Considerations**

- **Target Interface**: Well-defined contract that clients depend on
- **Adaptee Interface**: New interface with different methods and capabilities
- **Adapter Implementation**: Translates calls between interfaces
- **Client Code**: Remains unchanged regardless of underlying implementation

### 3. **Real-World Application**

- **API Versioning**: Managing multiple API versions
- **Legacy System Integration**: Integrating new systems with old ones
- **Third-Party Library Adaptation**: Making incompatible libraries work together
- **Database Migration**: Adapting new database schemas to old interfaces

## 🧪 Testing Strategy

The project includes comprehensive end-to-end tests covering:

1. **Legacy Provider Tests**: Verify DOCX generation works correctly
2. **New Provider Tests**: Verify PDF generation with advanced features
3. **Adapter Tests**: Verify v2 provider works through v1 interface
4. **Error Handling**: Malformed requests, missing directories, etc.
5. **File Generation**: Actual file creation and format verification

## 📚 API Documentation

Full Swagger documentation is available at `http://localhost:3000/docs` including:

- All endpoint specifications
- Request/response schemas
- Example payloads
- Error responses
- Interactive testing interface

## 🤝 Contributing

Feel free to use this project as a learning resource or extend it with:

- Additional report formats (Excel, HTML, etc.)
- More sophisticated adapters with caching or validation
- Database persistence for report metadata
- Authentication and authorization layers
- More advanced PDF features (watermarks, digital signatures)
- Performance monitoring and logging
- Docker containerization
- CI/CD pipeline setup

## 📚 Related HFDP Concepts

- **Adapter Pattern fundamentals**
- **Interface compatibility**
- **Legacy system integration**
- **API versioning strategies**
- **Client-server decoupling**

## 📄 License

MIT
