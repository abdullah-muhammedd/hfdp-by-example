# Composite & Iterator Pattern – ETL Pipeline Example

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 9’s **Composite** and **Iterator** patterns in a real-world data engineering context.

## 🎯 Overview

Rather than the classic menu or GUI examples, this codebase constructs a full **ETL (Extract, Transform, Load)** pipeline that:

- **Extracts** sensor data from a CSV file
- **Cleans** and normalizes values (nulls, out‑of‑range clipping)
- **Transforms** into a consistent schema
- **Loads** both a human‑readable summary and a raw JSON dump

Each processing unit is a **Job** implementing a common `Executable` interface, and can be composed into higher‑level `PipelineJob` instances (Composite). The pipeline itself is traversed in depth‑first order via an **Iterator**, so the main runner can invoke each leaf job uniformly.

## 🏗️ Project Structure

```
.
├── files/                      # Raw input data
│   └── sensor_readings.csv
├── output/                     # Pipeline outputs
│   ├── full.json
│   └── summary.txt
├── src/
│   ├── jobs/                   # Concrete and composite job implementations
│   │   ├── clean.job.ts
│   │   ├── data.job.ts
│   │   ├── extract.job.ts
│   │   ├── load.job.ts
│   │   ├── pipeline.job.ts
│   │   └── transform.job.ts
│   └── types/
│       └── interface/
│           └── executable.interface.ts
├── main.ts                     # Entry point: composes & runs the ETL pipeline
├── package.json
└── tsconfig.json
```

## 🎨 Design Pattern Implementation

### Composite Pattern

- **Component**: `Executable` (leaf or composite)
- **Leaf**: `DataJob` subclasses (`ExtractJob`, `CleanJob`, `TransformJob`, `LoadJob`)
- **Composite**: `PipelineJob` holds a list of `Executable` children
- **Benefit**: Treat individual jobs and grouped pipelines uniformly

### Iterator Pattern

- **Iterable**: `PipelineJob` implements `[Symbol.iterator]()`
- **Traversal**: Depth‑first search yields every `Executable` in order
- **Benefit**: Main runner can simply `for (const job of pipeline)` to execute each leaf

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (for TypeScript & `fs/promises`)
- Yarn or npm
- bun installed

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
yarn install
```

### Running the Demo

```bash
#run the ETL pipeline
yarn dev
```

> Ensure `./files/sensor_readings.csv` exists before running.

## 💡 Usage Examples

```typescript
import { PipelineJob } from './src/jobs/pipeline.job';
import { ExtractJob } from './src/jobs/extract.job';
import { CleanJob } from './src/jobs/clean.job';
import { TransformJob } from './src/jobs/transform.job';
import { LoadJob } from './src/jobs/load.job';

async function run() {
  const extract = new ExtractJob('./files/sensor_readings.csv');
  const clean = new CleanJob([]);
  const transform = new TransformJob([]);
  const load = new LoadJob([], './output/summary.txt', './output/full.json.txt');

  const prepareStage = new PipelineJob('Prepare Stage');
  prepareStage.add(clean);
  prepareStage.add(transform);

  const fullPipeline = new PipelineJob('Full ETL Pipeline');
  fullPipeline.add(extract);
  fullPipeline.add(prepareStage);
  fullPipeline.add(load);

  let data: any = null;
  for (const job of fullPipeline) {
    if (job.setInput) job.setInput(data);
    data = await job.execute();
  }

  console.log('✅ ETL Pipeline completed');
}

run();
```

## 🔍 Key Learning Points

1. **Composite Pattern**
   - Uniform API for single jobs vs. pipelines
   - Easy nesting & extension

2. **Iterator Pattern**
   - Depth‑first traversal without exposing internal structure
   - Simplifies execution loop

3. **ETL Pipeline Mechanics**
   - Real data handling: file I/O, parsing, cleaning, formatting, output
   - Directory creation & error handling in Load step

## 📝 Notes

- Leaf jobs throw if `add()` is invoked, preserving Composite integrity.
- Output directories are created dynamically if missing.
- CSV parsing uses `csv-parse` for streaming performance.

## 🤝 Contributing

Feel free to extend this with:

- Additional jobs (e.g., validation, enrichment)
- Parallel or branching pipelines
- Integration with databases or message queues
- More robust error/retry decorators

## 📚 Related HFDP Concepts

- **Composite Pattern** (Chapter 9)
- **Iterator Pattern** (Chapter 9)
- Open/Closed & Single Responsibility Principles

## 📄 License

MIT
