import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  courses: Course[] = [];

  beginnerChecked: boolean = false;
  intermediateChecked: boolean = false;
  advancedChecken: boolean = false;

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }

  showBeginnerCourses(level: string) {
    this.beginnerChecked = !this.beginnerChecked;

    if (this.beginnerChecked === true) {
      this.courseService.getCourses().subscribe((courses) => {
        const beginnerCourses = courses.filter(
          (course: Course) => course.level.toLowerCase() === level.toLowerCase()
        );
        this.courses = beginnerCourses;
      });
    } else {
      this.courseService
        .getCourses()
        .subscribe((courses) => (this.courses = courses));
    }
  }

  showIntermediateCourses(level: string) {
    this.intermediateChecked = !this.intermediateChecked;

    if (this.beginnerChecked === true) {
      this.courseService.getCourses().subscribe((courses) => {
        const intermediateCourses = courses.filter(
          (course: Course) => course.level.toLowerCase() === level.toLowerCase()
        );
        this.courses = intermediateCourses;
      });
    } else {
      this.courseService
        .getCourses()
        .subscribe((courses) => (this.courses = courses));
    }
  }

  showAdvancedCourses(level: string) {
    this.advancedChecken = !this.advancedChecken;

    if (this.advancedChecken === true) {
      this.courseService.getCourses().subscribe((courses) => {
        const advancedCourses = courses.filter(
          (course: Course) => course.level.toLowerCase() === level.toLowerCase()
        );
        this.courses = advancedCourses;
      });
    } else {
      this.courseService
        .getCourses()
        .subscribe((courses) => (this.courses = courses));
    }
  }

  showAllCourses() {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }
}
