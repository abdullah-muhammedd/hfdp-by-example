import { PaymentFailure } from './payment-failure.type';
import { PaymentSuccess } from './payment-success.type';
import { PaymentInitiated } from './payment-initiated.type';
import { RefundIssued } from './refund-issued.type';
import { UserLogin } from './user-login.type';
import { UserLogout } from './user-logout.type';
import { UserRegistered } from './user-registered.type';
import { UserProfileUpdated } from './user-profile-updated.type';

export type EventMap = {
  // Payment events
  PaymentFailure: PaymentFailure;
  PaymentSuccess: PaymentSuccess;
  PaymentInitiated: PaymentInitiated;
  RefundIssued: RefundIssued;

  // User operations
  UserLogin: UserLogin;
  UserLogout: UserLogout;
  UserRegistered: UserRegistered;
  UserProfileUpdated: UserProfileUpdated;
};
