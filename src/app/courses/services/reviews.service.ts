import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Review } from 'src/app/courses/models/review.interface';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  averageRatingValue: number = 0;
  private reviewsURL = 'http://localhost:3000/reviews';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private coursesService: CoursesService
  ) {}

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
        likes: [],
        dislikes: [],
        userEmail: this.authService.loggedUser.email,
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

  onLikeReview(
    reviewId: number,
    userId: number,
    review: Review
  ): Observable<any> {
    if (review.dislikes.includes(userId)) {
      const index = review.dislikes.indexOf(userId);
      review.dislikes.splice(index, 1);
    }

    const likes = review.likes || [];
    likes.push(userId);
    const likesData = {
      likes: likes,
      dislikes: review.dislikes,
    };

    return this.http.patch<any>(
      `http://localhost:3000/reviews/${reviewId}`,
      likesData
    );
  }

  onDislikeReview(
    reviewId: number,
    userId: number,
    review: Review
  ): Observable<any> {
    if (review.likes.includes(userId)) {
      const index = review.likes.indexOf(userId);
      review.likes.splice(index, 1);
    }

    const dislikes = review.dislikes || [];
    dislikes.push(userId);
    const dislikesData = {
      dislikes: dislikes,
      likes: review.likes,
    };

    return this.http.patch<any>(
      `http://localhost:3000/reviews/${reviewId}`,
      dislikesData
    );
  }

  deleteReview(reviewId: number): Observable<Review[]> {
    const url = `http://localhost:3000/reviews/${reviewId}`;
    return this.http.delete<Review[]>(url);
  }
}
