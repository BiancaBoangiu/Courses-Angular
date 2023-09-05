import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  experienceLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  activeButton: string = 'All';
  courses: Course[] = [];

  sortSelection = '';

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }

  showCoursesByExperience(level: string) {
    this.activeButton = level;
    if (level === 'All') {
      this.courseService.getCourses().subscribe((courses) => {
        this.courses = courses;
      });
    } else {
      this.courseService.getCoursesByExperience(level).subscribe((courses) => {
        this.courses = courses;
      });
    }
  }

  sort() {
    console.log(this.sortSelection);
  }

  // showCoursesByPriceLevel(level: string) {
  //   this.deselectOtherLevels(level);
  //   if (level === 'all') {
  //     this.allPriceChecked = !this.allPriceChecked;
  //   }

  //   if (level === 'free') {
  //     this.freeChecked = !this.freeChecked;
  //   }

  //   if (level === 'premium') {
  //     this.premiumChecked = !this.premiumChecked;
  //   }

  //   if (this.allPriceChecked) {
  //     this.courseService
  //       .getCourses()
  //       .subscribe((courses) => (this.courses = courses));
  //   } else {
  //     if (this.freeChecked) {
  //       this.courseService.getCourses().subscribe((courses) => {
  //         const coursesByFreeLevel = courses.filter(
  //           (course: Course) => course.price === 0
  //         );
  //         this.courses = coursesByFreeLevel;
  //       });
  //     } else if (this.premiumChecked) {
  //       this.courseService.getCourses().subscribe((courses) => {
  //         const coursesByPremiumLevel = courses.filter(
  //           (course: Course) => course.price > 0
  //         );
  //         this.courses = coursesByPremiumLevel;
  //       });
  //     } else {
  //       this.courseService
  //         .getCourses()
  //         .subscribe((courses) => (this.courses = courses));
  //     }
  //   }
  // }
}
