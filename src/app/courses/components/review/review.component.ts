import { Component, Input } from '@angular/core';
import { Review } from '../../models/review.interface';
import { ReviewsService } from '../../services/reviews.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  @Input() review!: Review;

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService
  ) {}

  onLikeReview(reviewId: number): void {
    const userLoggedId = this.authService.loggedUser.id;
    this.reviewsService.onLikeReview(reviewId, userLoggedId).subscribe();
  }
}
