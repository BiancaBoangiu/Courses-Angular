import { notifierService } from 'src/app/auth/services/notifier.service';
import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.interface';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-course-grid-card',
  templateUrl: './course-grid-card.component.html',
  styleUrls: ['./course-grid-card.component.scss'],
})
export class CourseGridCardComponent {
  @Input() course!: Course;
  addedToWishlist: boolean = false;

  ngOnInit(): void {
    this.getUser();
  }

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService,
    private notifierService: notifierService
  ) {}

  getUser() {
    const userData = this.authService.getUserData();
    if (!userData) {
      return;
    } else {
      if (userData.wishlist) {
        this.addedToWishlist =
          userData.wishlist.includes(this.course.id) || false;
      }
    }
  }

  addCourseToWishlist() {
    if (this.authService.getUserData()) {
      const userId = this.authService.getUserData()?.id as number;

      this.authService.getUserById(userId).subscribe((user) => {
        this.coursesService
          .addToWishlist(this.course.id, user.id, user)
          .subscribe(() => {
            this.addedToWishlist = !this.addedToWishlist;
            this.notifierService.showNotifications('Course added to wishlist');
          });
      });
    }
  }

  deleteCourseFromWishlist() {
    if (this.authService.getUserData()) {
      const userId = this.authService.getUserData()?.id as number;

      this.authService.getUserById(userId).subscribe((user) => {
        this.coursesService
          .deleteFromWishlist(this.course.id, user, user.id)
          .subscribe(() => {
            this.addedToWishlist = !this.addedToWishlist;
            this.notifierService.showError('Course removed from wishlist');
          });
      });
    }
  }
}
