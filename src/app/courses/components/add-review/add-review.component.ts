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

  @Input() rating: number = 0;
  @Input() message!: string;
  emptyRatingError: boolean = false;
  emptyMessageError: boolean = false;

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService
  ) {}

  addReview() {
    if (this.rating === 0) {
      this.emptyRatingError = true;
    }
    if (!this.message) {
      this.emptyMessageError = true;
    }

    if (this.emptyRatingError || this.emptyMessageError) {
      return;
    }
    const userId = this.authService.loggedUser.id;

    this.reviewsService
      .addReview(this.message, this.rating, userId, this.authService.courseId)
      .subscribe((response) => {
        this.onReviewAdded.emit(response);

        this.rating = 0;
        this.message = '';
      });
  }
}
