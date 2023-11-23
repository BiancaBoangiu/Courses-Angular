import { Payment } from 'src/app/user/models/payment-interface';

export interface Auth {
  id: number;
  email: string;
  password: string;
  wishlist: number[];
  image: string;
  firstName: string;
  lastName: string;
  description: string;
  education: string;
  payment: Payment;
  billingAddress: string;
  wallet: number;
  hideNotifications: boolean;
  profileVisibility: boolean;
  smsConfirmation: boolean;
  emailNotificaions: boolean;
  cart: number[];
  purchasedCourses: number[];
}
