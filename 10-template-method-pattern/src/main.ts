import { PrismaClient } from '../generated/prisma';
import { CsvETLJob } from './csv-etl.job';
import { ExcelETLJob } from './excel-etl.job';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  await prisma.webEvent.deleteMany();
  const csvPath = path.join(__dirname, '../files/events.csv');
  const excelPath = path.join(__dirname, '../files/events.xlsx');

  console.log('Starting CSV ETL Job...');
  const csvJob = new CsvETLJob(csvPath);
  await csvJob.run();
  console.log('CSV ETL Job completed.');

  console.log('Starting Excel ETL Job...');
  const excelJob = new ExcelETLJob(excelPath);
  await excelJob.run();
  console.log('Excel ETL Job completed.');
}

main().catch((err) => {
  console.error('Error running ETL jobs:', err);
  process.exit(1);
});
