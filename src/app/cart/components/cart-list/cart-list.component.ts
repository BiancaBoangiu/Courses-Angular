import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent {
  cartCourses!: Course[];
  cartTotal!: number;
  isLoading!: boolean;

  constructor(
    private coursesService: CoursesService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getCartCourses();
  }

  getCartCourses() {
    const cart = this.cartService.getCart();

    if (cart.length >= 1) {
      this.isLoading = true;
      this.coursesService.getCoursesByIds(cart).subscribe((courses) => {
        this.isLoading = false;
        this.cartCourses = courses;
        this.cartTotal = this.cartCourses.reduce(
          (total, course) => total + +course.price,
          0
        );
      });
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
