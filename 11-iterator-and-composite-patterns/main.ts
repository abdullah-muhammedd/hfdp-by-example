import { CleanJob } from './src/jobs/clean.job';
import { ExtractJob } from './src/jobs/extract.job';
import { LoadJob } from './src/jobs/load.job';
import { PipelineJob } from './src/jobs/pipeline.job';
import { TransformJob } from './src/jobs/transform.job';
import { DataJob } from './src/jobs/data.job';

async function main() {
  // Set up concrete jobs
  const extractJob = new ExtractJob('./files/sensor_readings.csv');
  const cleanJob = new CleanJob([]);
  const transformJob = new TransformJob([]);
  const loadJob = new LoadJob([], './output/summary.txt', './output/full.json');

  // Create inner stage
  const prepareStage = new PipelineJob('Prepare Stage');
  prepareStage.add(cleanJob);
  prepareStage.add(transformJob);

  // Top-level pipeline
  const fullPipeline = new PipelineJob('Full ETL Pipeline');
  fullPipeline.add(extractJob);
  fullPipeline.add(prepareStage);
  fullPipeline.add(loadJob);

  // Execute using the iterator
  let currentData: any = null;

  for (const job of fullPipeline) {
    // Only operate on leaf jobs (actual processing steps)
    if (job instanceof DataJob) {
      if (job.setInput) job.setInput(currentData); // pass data to job
      currentData = await job.execute(); // get output
    }
  }

  console.log('✅ ETL Pipeline completed');
}

main().catch((err) => {
  console.error('❌ Pipeline failed:', err);
});
