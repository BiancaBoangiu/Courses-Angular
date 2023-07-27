import { Reviews } from 'src/app/courses/models/reviews.interface';

export interface Auth {
  id: number;
  email: string;
  password: string;
  userType: string;
  reviews: Reviews[];
}
