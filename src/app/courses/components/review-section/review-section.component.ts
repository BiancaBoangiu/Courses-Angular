import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../models/review.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-review-section',
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss'],
})
export class ReviewSectionComponent {
  reviews!: Review[];
  userLogged!: boolean;

  @Output() updateAverageRating: EventEmitter<number> =
    new EventEmitter<number>();

  @Output() sendReviewsAfterDelete: EventEmitter<Review[]> = new EventEmitter<
    Review[]
  >();

  @Output() sendReviewsAfterAdd: EventEmitter<Review[]> = new EventEmitter<
    Review[]
  >();

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewsService.showCourseReviews().subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
    if (this.authService.loggedUser) {
      this.userLogged = true;
    } else {
      this.userLogged = false;
    }
  }

  addNewReview(review: Review) {
    this.reviews.push(review);
    const sum = this.reviews.reduce(
      (accumulator, review) => accumulator + Number(review.rating),
      0
    );

    const averageRatingValue = parseFloat(
      Number(sum / this.reviews.length).toFixed(1)
    );

    this.updateAverageRating.emit(averageRatingValue);
    this.sendReviewsAfterAdd.emit(this.reviews);
  }

  sendAverageRating(averageRating: number) {
    this.updateAverageRating.emit(averageRating);
  }

  sendReviews(reviews: Review[]) {
    this.sendReviewsAfterDelete.emit(reviews);
  }
}
