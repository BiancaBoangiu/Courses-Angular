import { AuthService } from 'src/app/auth/services/auth.service';
import { Component } from '@angular/core';
import { Reviews } from '../../models/reviews.interface';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  reviews!: Reviews[];

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.showReviews();
  }

  showReviews() {
    this.reviewsService.showUserReviews().subscribe((reviews) => {
      this.reviews = reviews;
    });
  }
}
