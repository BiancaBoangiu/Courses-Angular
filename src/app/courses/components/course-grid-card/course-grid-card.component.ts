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
    const user = this.authService.getUserData();
    if (user) {
      const wishlist = this.authService.getUserData()?.wishlist;
      if (wishlist) {
        if (!wishlist.includes(this.course.id)) {
          wishlist.push(this.course.id);
          this.addedToWishlist = true;
          this.notifierService.showNotifications('Course added to wishlist');
          const updatedUser = { ...user, wishlist: wishlist };
          this.authService.updateUser(updatedUser);
          this.coursesService.updateWishlist(wishlist, user.id);
        }
      } else {
        const newWishlist = [];
        newWishlist.push(user.id);
        this.coursesService.updateWishlist(newWishlist, user.id);
        this.addedToWishlist = true;
        this.notifierService.showNotifications('Course added to wishlist');
      }
    }
  }

  deleteCourseFromWishlist() {
    const user = this.authService.getUserData();
    if (user) {
      const wishlist = this.authService.getUserData()?.wishlist;
      if (wishlist?.includes(user.id)) {
        const index = wishlist.indexOf(this.course.id);
        wishlist.splice(index, 1);
        this.addedToWishlist = false;
        this.notifierService.showNotifications('Course added to wishlist');
        const updatedUser = { ...user, wishlist: wishlist };
        this.authService.updateUser(updatedUser);
        this.coursesService.updateWishlist(wishlist, user.id);
      }
    }
  }
}
