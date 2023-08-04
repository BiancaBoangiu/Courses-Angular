import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Review } from '../../models/review.interface';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent {
  @Output() onReviewAdded: EventEmitter<Review> = new EventEmitter<Review>();
  @Output() onAverageRatingUpdate: EventEmitter<number> =
    new EventEmitter<number>();
  rating: number = 0;
  message: string = '';
  ratings: number[] = [];
  averageRating: number = 0;

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService
  ) {}

  addReview() {
    const userId = this.authService.loggedUser.id;

    this.reviewsService
      .addReview(this.message, this.rating, userId, this.authService.courseId)
      .subscribe((response) => {
        this.onReviewAdded.emit(response);

        this.reviewsService
          .showAverageRating(this.authService.courseId)
          .subscribe((ratingResponse) => {
            this.averageRating = ratingResponse.averageRating;
            this.onAverageRatingUpdate.emit(this.averageRating);
          });

        this.rating = 0;
        this.message = '';
      });
  }
}
