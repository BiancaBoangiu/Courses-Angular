import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent {
  cartCourses!: Course[];
  cartTotal!: number;
  constructor(
    private coursesService: CoursesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getCartCourses();
  }

  getCartCourses() {
    const userCart = this.authService.getUserData()?.cart;
    if (userCart) {
      if (userCart.length >= 1) {
        this.coursesService
          .getCoursesByIds(userCart)
          .subscribe((cartCourses) => {
            this.cartCourses = cartCourses;
            this.cartTotal = this.cartCourses.reduce(
              (total, course) => total + +course.price,
              0
            );
          });
      }
    }
  }

  onDeleteCourse(deletedCourse: Course) {
    this.cartCourses = this.cartCourses.filter(
      (course) => course.id !== deletedCourse.id
    );
    this.cartTotal = this.cartCourses.reduce(
      (total, course) => total + +course.price,
      0
    );
  }
}
