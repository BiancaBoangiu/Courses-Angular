import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Reviews } from '../models/reviews.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  reviews: Reviews[] = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  addReview(
    message: string,
    rating: number,
    userId: number,
    courseId: number
  ): Observable<Reviews[]> {
    if (this.authService.loggedUser) {
      const reviewsURL = `http://localhost:3000/reviews`;
      const body = {
        userId: userId,
        rating: rating,
        message: message,
        courseId: courseId,
      };

      return this.http.post<Reviews[]>(reviewsURL, body, this.httpOptions);
    } else {
      return of<Reviews[]>([]);
    }
  }

  showUserReviews(): Observable<Reviews[]> {
    const reviewsURL = `http://localhost:3000/reviews/`;
    return this.http.get<Reviews[]>(reviewsURL).pipe(
      map((reviews) => {
        const courseIdFilter = this.authService.courseId;
        return reviews.filter((review) => review.courseId === courseIdFilter);
      })
    );
  }
}
