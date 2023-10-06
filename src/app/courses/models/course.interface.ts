export interface Course {
  id: number;
  name: string;
  description: string;
  time: number;
  experience: string;
  amount: number;
  author: string;
  image: string;
  authorImage: string;
  rating: number;
  averageRating: number;
  views: number;
  hasCertificate: boolean;
  price: number;
  isPremium: boolean;
  instructorId: number;
  curriculum: any;
  wishlist: number[];
}
