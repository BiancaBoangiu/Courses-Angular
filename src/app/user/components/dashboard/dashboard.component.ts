import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  totalCourses!: number;
  numberOfCertificates: number = 0;

  showTotalCourses(totalCourses: number) {
    this.totalCourses = totalCourses;
  }

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this,
      this.authService.loggedUser$.subscribe((user) => {
        if (user && user.purchasedCourses.length > 0) {
          this.coursesService
            .getCoursesByIds(user.purchasedCourses)
            .subscribe((courses) => {
              courses.forEach((course) => {
                if (course.hasCertificate) {
                  this.numberOfCertificates++;
                  console.log(this.numberOfCertificates);
                }
              });
            });
        }
      });
  }
}
