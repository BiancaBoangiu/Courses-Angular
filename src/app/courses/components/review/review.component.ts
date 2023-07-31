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
  numberOfLikes!: number;
  numberOfDislikes!: number;
  likeStatus!: boolean;
  dislikeStatus!: boolean;

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.numberOfLikes = this.review.likesCount;
    this.numberOfDislikes = this.review.dislikesCount;
    if (this.review.likes.includes(this.authService.loggedUser.id)) {
      this.likeStatus = true;
    }
    if (this.review.dislikes.includes(this.authService.loggedUser.id)) {
      this.dislikeStatus = true;
    }
  }

  onLikeReview(reviewId: number): void {
    const userLoggedId = this.authService.loggedUser.id;
    if (this.review.likes.includes(userLoggedId)) {
      return;
    } else {
      this.reviewsService
        .onLikeReview(reviewId, userLoggedId, this.review)
        .subscribe((response) => {
          this.numberOfLikes = response.likes.length;
          this.numberOfDislikes = response.dislikes.length;
          this.likeStatus = true;
          this.dislikeStatus = false;
        });
    }
  }

  onDislikeReview(reviewId: number): void {
    const userLoggedId = this.authService.loggedUser.id;

    if (this.review.dislikes.includes(userLoggedId)) {
      return;
    } else {
      this.reviewsService
        .onDislikeReview(reviewId, userLoggedId, this.review)
        .subscribe((response) => {
          this.numberOfDislikes = response.dislikes.length;
          this.numberOfLikes = response.likes.length;
          this.dislikeStatus = true;
          this.likeStatus = false;
        });
    }
  }
}
