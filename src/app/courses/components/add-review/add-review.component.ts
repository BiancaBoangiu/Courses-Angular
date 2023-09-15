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

  rating: number = 0;
  message: string = '';

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService
  ) {}

  addReview() {
    const userId = this.authService.getUserData()?.id as number;

    this.reviewsService
      .addReview(this.message, this.rating, userId, this.authService.courseId)
      .subscribe((response) => {
        this.onReviewAdded.emit(response);

        this.message = '';
      });
  }
}
