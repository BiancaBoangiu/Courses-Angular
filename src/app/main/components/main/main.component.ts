import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { InstructorsService } from 'src/app/instructors/services/instructors.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  numberOfCourses!: number;
  numberOfInstructors!: number;
  numberOfUsers!: number;
  coursesByPopularity!: Course[];

  constructor(
    private coursesService: CoursesService,
    private instructorsService: InstructorsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.showNumberOfCourses();
    this.showNumberOfInstructors();
    this.showNumberOfUsers();
    this.showCoursesByPopularity();
  }

  showNumberOfCourses() {
    this.coursesService.getCourses().subscribe((courses) => {
      this.numberOfCourses = courses.length;
    });
  }

  showNumberOfInstructors() {
    this.instructorsService.getInstructors().subscribe((instructors) => {
      this.numberOfInstructors = instructors.length;
    });
  }

  showNumberOfUsers() {
    this.authService.getUsers().subscribe((users) => {
      this.numberOfUsers = users.length;
    });
  }

  showCoursesByPopularity() {
    this.coursesService.getCourses().subscribe((courses) => {
      const coursesByPopularity = courses
        .sort((a, b) => b.views - a.views)
        .slice(0, 8);
      this.coursesByPopularity = coursesByPopularity;
    });
  }
}
