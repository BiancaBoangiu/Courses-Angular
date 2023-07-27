import { AuthService } from 'src/app/auth/services/auth.service';
import { Component } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../models/review.interface';

@Component({
  selector: 'app-review-section',
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss'],
})
export class ReviewSectionComponent {
  reviews!: Review[];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewsService.showCourseReviews().subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
  }

  addNewReview(review: Review) {
    this.reviews.push(review);
  }
}
