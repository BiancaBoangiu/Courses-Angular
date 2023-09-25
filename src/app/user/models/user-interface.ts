import { Payment } from './payment-interface';

export interface User {
  email: string;
  id: number;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  description: string;
  education: string;
  wishlist: number[];
  payment: Payment;
}
