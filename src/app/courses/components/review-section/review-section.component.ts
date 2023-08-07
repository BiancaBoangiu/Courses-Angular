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
  @Output() updatedAverageRating: EventEmitter<number> =
    new EventEmitter<number>();

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
  }

  onEmitAverageRatingUpdate(newAverageRating: number) {
    this.updatedAverageRating.emit(newAverageRating);
  }
}
