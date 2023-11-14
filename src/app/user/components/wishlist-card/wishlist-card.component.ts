import { notifierService } from 'src/app/auth/services/notifier.service';
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
    private coursesService: CoursesService,
    private notifierService: notifierService
  ) {}

  deleteCourseFromWishlist() {
    if (this.authService.getUserData()) {
      const user = this.authService.getUserData();
      const wishlist = this.authService.getUserData()?.wishlist;

      if (wishlist && user) {
        const index = wishlist.indexOf(this.course.id);
        wishlist.splice(index, 1);
        this.coursesService
          .updateWishlist(wishlist, user.id)
          .subscribe((user) => {
            this.authService.updateUser(user);
            this.wishlistCoursesUpdated.emit(this.course.id);
            this.notifierService.showError('Course removed from wishlist');
          });
      }
    }
  }
}
