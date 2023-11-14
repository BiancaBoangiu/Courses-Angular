import { notifierService } from 'src/app/auth/services/notifier.service';
import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CoursesService } from '../../services/courses.service';
import { Auth } from 'src/app/auth/models/auth.interface';

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

    if (userData?.wishlist.includes(this.course.id)) {
      this.addedToWishlist = true;
    } else {
      this.addedToWishlist = false;
    }
  }

  updateWishlist() {
    const user = this.authService.getUserData();
    if (user) {
      const wishlist = this.authService.getUserData()?.wishlist || [];

      if (!wishlist.includes(this.course.id)) {
        wishlist.push(this.course.id);
        this.addedToWishlist = true;
        this.notifierService.showNotifications('Course added to wishlist');
        const updatedUser: Auth = { ...user, wishlist: wishlist };
        this.coursesService.updateWishlist(wishlist, user.id).subscribe();
        this.authService.updateUser(updatedUser);
      } else {
        const index = wishlist.indexOf(this.course.id);
        wishlist.splice(index, 1);
        this.addedToWishlist = false;
        this.notifierService.showError('Course removed from wishlist');
        const updatedUser: Auth = { ...user, wishlist: wishlist };
        this.coursesService.updateWishlist(wishlist, user.id).subscribe();
        this.authService.updateUser(updatedUser);
      }
    }
  }
}
