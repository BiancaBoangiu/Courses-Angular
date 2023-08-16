import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../models/review.interface';
import { ReviewsService } from '../../services/reviews.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  @Output() onDeleteReview: EventEmitter<number> = new EventEmitter<number>();
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
    const loggedUserId = this.authService.loggedUser?.id;
    this.likeStatus = false;
    this.dislikeStatus = false;
    this.numberOfLikes = this.review.likes.length;
    this.numberOfDislikes = this.review.dislikes.length;

    if (this.review.likes.includes(loggedUserId)) {
      this.likeStatus = true;
    } else {
      this.likeStatus = false;
    }

    if (this.review.dislikes.includes(loggedUserId)) {
      this.dislikeStatus = true;
    } else {
      this.dislikeStatus = false;
    }
  }

  onLikeReview(reviewId: number): void {
    const userLoggedId = this.authService.loggedUser?.id;

    if (!userLoggedId) {
      return;
    }

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
    const userLoggedId = this.authService.loggedUser?.id;

    if (!userLoggedId) {
      return;
    }

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

  deleteReview(reviewId: number) {
    this.onDeleteReview.emit(reviewId);
  }
}
