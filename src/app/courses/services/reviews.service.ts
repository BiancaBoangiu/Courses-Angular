import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { Review } from 'src/app/courses/models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private reviewsURL = 'http://localhost:3000/reviews';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  addReview(
    message: string,
    rating: number,
    userId: number,
    courseId: number
  ): Observable<Review> {
    if (this.authService.loggedUser) {
      const body = {
        userId: userId,
        rating: rating,
        message: message,
        courseId: courseId,
      };
      return this.http.post<Review>(this.reviewsURL, body, this.httpOptions);
    } else {
      return of({} as Review);
    }
  }

  showCourseReviews(): Observable<Review[]> {
    const reviewsURL = `http://localhost:3000/reviews?courseId=${this.authService.courseId}`;
    return this.http.get<Review[]>(reviewsURL);
  }

  onLikeReview(reviewId: number, userId: number): Observable<any> {
    const data = [{ userId: userId }];
    const likesData = { likes: data };
    return this.http.patch<any>(
      `http://localhost:3000/reviews/${reviewId}`,
      likesData
    );
  }
}
