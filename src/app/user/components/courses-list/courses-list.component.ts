import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  courses!: Course[];
  constructor(
    private authService: AuthService,
    private coursesService: CoursesService
  ) {}
  ngOnInit() {
    this.getPurchasedCourses();
  }

  getPurchasedCourses() {
    const purchasedCourses = this.authService.getUserData()?.purchasedCourses;
    if (purchasedCourses) {
      this.coursesService
        .getCoursesByIds(purchasedCourses)
        .subscribe((courses) => {
          this.courses = courses;
        });
    }
  }
}
