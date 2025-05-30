import { EventsService } from './service/events.service';
import { EmailEventProvider } from './providers/email-event.provider';
import { SMSEventProvider } from './providers/sms-event.provider';
import { LoggingEventProvider } from './providers/logging-event.provider';
import { UserService } from './service/user.service';

// Create the events service
const eventsService = new EventsService();

// Create observers
const emailObserver = new EmailEventProvider('admin@example.com');
const smsObserver = new SMSEventProvider('+1234567890');
const loggingObserver = new LoggingEventProvider();

// Subscribe observers to the service
eventsService.subscribe(emailObserver);
eventsService.subscribe(smsObserver);
eventsService.subscribe(loggingObserver);

// Create the user service
const userService = new UserService(eventsService);

// Simulate some events
console.log('Simulating user login...');
userService.simulateUserLogin('user123');

console.log('\nSimulating failed login attempts...');
userService.simulateFailedLogin('hacker', 5);

console.log('\nSimulating user logout...');
userService.simulateUserLogout('user123');

// Example of unsubscribing an observer
console.log('\nUnsubscribing SMS observer...');
eventsService.unsubscribe(smsObserver);

console.log("\nSimulating another login (SMS observer won't receive this)...");
userService.simulateUserLogin('user456');
