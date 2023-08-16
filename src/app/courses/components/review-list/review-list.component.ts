import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../models/review.interface';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent {
  @Input() reviews!: Review[];
  @Output() updateAverageRating: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() sendReviewsAfterDelete: EventEmitter<Review[]> = new EventEmitter<
    Review[]
  >();

  constructor(private reviewsService: ReviewsService) {}

  deleteReview(reviewId: number) {
    this.reviewsService.deleteReview(reviewId).subscribe(() => {
      const index = this.reviews.findIndex((review) => review.id === reviewId);

      this.reviews.splice(index, 1);

      const sum = this.reviews.reduce(
        (accumulator, review) => accumulator + Number(review.rating),
        0
      );

      const averageRatingValue = parseFloat(
        Number(sum / this.reviews.length).toFixed(1)
      );

      this.sendReviewsAfterDelete.emit(this.reviews);

      this.updateAverageRating.emit(averageRatingValue);
    });
  }
}
