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
  priceLevel = ['All', 'Free', 'Premium'];
  activeLevelButton: string = '';
  activePriceButton: string = '';
  courses: Course[] = [];

  sortSelection = '';

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }

  showCoursesByExperience(level: string) {
    this.activeLevelButton = level;
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

  showCoursesByPrice(price: string) {
    this.activePriceButton = price;
    this.courseService.getCoursesByPrice(price).subscribe((courses) => {
      this.courses = courses;
    });
  }
  sort(option: string) {
    this.courseService.getCoursesByOption(option).subscribe((courses) => {
      this.courses = courses;
    });
  }
}
