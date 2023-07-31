export interface Review {
  rating: number;
  message: string;
  userId: number;
  courseId: number;
  id: number;
  likes: number[];
  likesCount: number;
  dislikes: number[];
  dislikesCount: number;
}
