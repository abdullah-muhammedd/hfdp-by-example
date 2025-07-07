# Template Method Pattern - ETL Jobs

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 8's **Template Method Pattern** in a real-world ETL (Extract, Transform, Load) context.

## 🎯 Overview

This project implements the Template Method Pattern to provide a flexible and extensible ETL pipeline for ingesting web event data from multiple file formats (CSV, Excel). The abstract `FileETLJob` class defines the skeleton of the ETL process, while concrete subclasses (`CsvETLJob`, `ExcelETLJob`) implement the extraction logic for each file type.

## 🏗️ Project Structure

```
10-template-method-pattern/
├── src/
│   ├── file-etl.job.ts      # Abstract ETL job (template method)
│   ├── csv-etl.job.ts       # CSV ETL job (concrete subclass)
│   ├── excel-etl.job.ts     # Excel ETL job (concrete subclass)
│   ├── main.ts              # Orchestrates ETL jobs
│   └── types/
│       └── web-event.ty.ts  # Shared WebEvent type
├── scripts/
│   ├── generate-csv.ts      # Script to generate sample CSV data
│   └── generate-excel.ts    # Script to generate sample Excel data
├── files/
│   ├── events.csv           # Sample CSV data (100 rows)
│   └── events.xlsx          # Sample Excel data (100 rows)
├── prisma/
│   └── schema.prisma        # Prisma schema for WebEvent
├── docker-compose.yml       # PostgreSQL service for local dev
├── package.json
└── README.md
```

## 🧩 Template Method Pattern Implementation

### Abstract Class: `FileETLJob`

- Defines the ETL skeleton: `extract → transform → clean → load → logResult`
- `extract()` is abstract and must be implemented by subclasses
- `transform`, `clean`, `load`, and `logResult` are shared steps

### Concrete Subclasses

- **CsvETLJob**: Implements `extract()` to read and parse CSV files
- **ExcelETLJob**: Implements `extract()` to read and parse Excel files

### Example Usage

```typescript
// src/main.ts
const csvJob = new CsvETLJob('files/events.csv');
await csvJob.run();

const excelJob = new ExcelETLJob('files/events.xlsx');
await excelJob.run();
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- Yarn
- PostgreSQL (local or via Docker)
- Bun

### Installation

```bash
# Clone the repository
# cd 10-template-method-pattern
# Install dependencies
yarn install
```

### Database Setup

You can use Docker to run a local PostgreSQL instance:

```bash
docker-compose up -d
```

This will start a PostgreSQL server with:

- User: `postgres`
- Password: `postgres`
- Database: `app_db`
- Port: `9000` (host) → `5432` (container)

### Environment

Create a `.env` file in the project root with:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:9000/app_db"
```

### Prisma Setup

Run migrations and generate the Prisma client:

```bash
yarn prisma migrate dev --name init
yarn prisma generate
```

### Generating Sample Data

Generate 100 rows of sample data for both CSV and Excel:

```bash
bun scripts/generate-csv.ts
bun scripts/generate-excel.ts
```

### Running the ETL Jobs

```bash
yarn dev
```

This will:

- Run both the CSV and Excel ETL jobs
- Load data from `files/events.csv` and `files/events.xlsx` into the database

### Open Prisma Studio

To inspect your data visually:

```bash
yarn studio
```

## 💡 Key Learning Points

- **Template Method Pattern**: Encapsulates the ETL workflow, allowing new file types to be added with minimal changes
- **Separation of Concerns**: Extraction logic is isolated per file type; transformation, cleaning, and loading are shared
- **Type Safety**: All event data is strongly typed via `WebEvent`
- **Extensibility**: Add new ETL jobs by subclassing `FileETLJob` and implementing `extract()`

## 📝 Notes

- This is a simulated implementation for learning purposes
- The sample data includes some missing/undefined fields to test data cleaning and validation
- All file writes are relative to the project root (`files/`)

## 📚 Related HFDP Concepts

- Template Method Pattern basics
- Encapsulation of algorithms
- Clean, extensible API design

## 📄 License

MIT
