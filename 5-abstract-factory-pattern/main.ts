import { BillingService } from './billing.service';
import { RabbitJobsFactory } from './job-provider/rabbit-mq/rabbit-mq.factory';
import { BullJobsFactory } from './job-provider/bull-mq/bull-mq.factory';

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runWithRabbitMQ(billingService: BillingService) {
  console.log('\n--- Using RabbitMQ ---');

  const rabbitFactory = new RabbitJobsFactory('billing-queue', 'amqp://localhost');

  await billingService.switchFactory(rabbitFactory);
  await billingService.billUser(1001);
  await billingService.startProcessing();
  await delay(1000);
}

async function runWithBullMQ(billingService: BillingService) {
  console.log('\n--- Using BullMQ ---');

  const bullFactory = new BullJobsFactory('billing-queue');

  await billingService.switchFactory(bullFactory);
  await billingService.billUser(2002);
  await billingService.startProcessing();
  await delay(1000);
}

async function main() {
  const billingService = new BillingService();

  await runWithRabbitMQ(billingService);
  await delay(1000);
  await runWithBullMQ(billingService);
  await delay(5000);
  console.log('\nAll jobs tested and connections closed.');
  process.exit(0);
}

main().catch(console.error);
