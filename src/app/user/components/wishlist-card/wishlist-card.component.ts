import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss'],
})
export class WishlistCardComponent {
  @Input() course!: Course;
  @Output() wishlistCoursesUpdated = new EventEmitter<number>();

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService
  ) {}

  deleteCourseFromWishlist() {
    if (this.authService.getUserData()) {
      const user = this.authService.getUserData();
      const userId = this.authService.getUserData()?.id as number;

      if (user) {
        this.coursesService
          .deleteFromWishlist(this.course.id, user, userId)
          .subscribe(() => {
            this.wishlistCoursesUpdated.emit(this.course.id);
          });
      }
    }
  }
}
