import { EmailNotificationProvider } from './provider/email-notification.provider';
import { WhatsAppNotificationProvider } from './provider/whatsapp-notification.provider';
import { NotificationService } from './service/notification.service';
import { NotificationProviderBuilder } from './builder/notification-provider.builder';

const printSection = (title: string) => {
  console.log('\n' + '='.repeat(50));
  console.log(`🔍 ${title}`);
  console.log('='.repeat(50));
};

async function demonstrateDecoratorPattern() {
  // 1. Basic notification without decorators
  printSection('1. Basic Notification (No Decorators)');
  const emailProvider = new EmailNotificationProvider();
  const notificationService = new NotificationService(emailProvider);

  await notificationService.sendNotification('Hello, this is a basic email');

  // 2. Adding a single decorator
  printSection('2. Single Decorator (With Logging)');
  const loggedProvider = new NotificationProviderBuilder(emailProvider).addLogging().build();

  notificationService.setProvider(loggedProvider);
  await notificationService.sendNotification('Email with logging capabilities');

  // 3. Rate limiting demonstration
  printSection('3. Rate Limiting in Action');
  const rateLimitedProvider = new NotificationProviderBuilder(emailProvider)
    .addLogging()
    .addRateLimit()
    .build();

  notificationService.setProvider(rateLimitedProvider);
  console.log('Sending two messages rapidly:');
  await notificationService.sendNotification('First message');
  await notificationService.sendNotification('Second message (should be rate limited)');

  // 4. Error handling with retry
  printSection('4. Error Handling & Retry');
  const whatsappProvider = new WhatsAppNotificationProvider();
  const reliableProvider = new NotificationProviderBuilder(whatsappProvider)
    .addLogging()
    .addErrorSimulation(80) // 80% chance of failure
    .addRetry() // Will retry failed attempts
    .build();

  notificationService.setProvider(reliableProvider);
  await notificationService.sendNotification('Message that might fail but will retry');
}

// Run demonstration
console.log('🚀 Decorator Pattern Demonstration');
demonstrateDecoratorPattern()
  .then(() => console.log('\n✨ Demonstration completed'))
  .catch((error) => console.log('\n❌ Demonstration failed:', error.message));
