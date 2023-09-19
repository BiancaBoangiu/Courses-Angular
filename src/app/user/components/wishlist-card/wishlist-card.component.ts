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
  wishlistCourses: Course[] = [];
  @Output() wishlistCoursesUpdated = new EventEmitter<Course[]>();

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService
  ) {}

  deleteCourseFromWishlist() {
    if (this.authService.getUserData()) {
      const userId = this.authService.getUserData()?.id as number;

      this.authService.getUserById(userId).subscribe((user) => {
        this.coursesService
          .deleteFromWishlist(this.course.id, user, user.id)
          .subscribe(() => {
            const wishlist = this.authService.getUserData()?.wishlist;
            this.wishlistCoursesUpdated.emit(wishlist);
          });
      });
    }
  }
}
