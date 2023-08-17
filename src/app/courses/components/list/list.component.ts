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
  advancedChecked: boolean = false;
  allChecked: boolean = false;

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }

  showCoursesByLevel(level: string) {
    this.deselectOtherLevels(level);
    if (level === 'all') {
      this.allChecked = !this.allChecked;
    }

    if (level === 'beginner') {
      this.beginnerChecked = !this.beginnerChecked;
    }

    if (level === 'intermediate') {
      this.intermediateChecked = !this.intermediateChecked;
    }

    if (level === 'advanced') {
      this.advancedChecked = !this.advancedChecked;
    }

    if (this.allChecked) {
      this.courseService
        .getCourses()
        .subscribe((courses) => (this.courses = courses));
    } else {
      if (
        this.advancedChecked ||
        this.beginnerChecked ||
        this.intermediateChecked
      ) {
        this.courseService.getCourses().subscribe((courses) => {
          const coursesByLevel = courses.filter(
            (course: Course) =>
              course.level.toLowerCase() === level.toLowerCase()
          );
          this.courses = coursesByLevel;
        });
      } else {
        this.courseService
          .getCourses()
          .subscribe((courses) => (this.courses = courses));
      }
    }
  }

  deselectOtherLevels(selectedLevel: string) {
    if (selectedLevel !== 'all') {
      this.allChecked = false;
    }
    if (selectedLevel !== 'beginner') {
      this.beginnerChecked = false;
    }
    if (selectedLevel !== 'intermediate') {
      this.intermediateChecked = false;
    }
    if (selectedLevel !== 'advanced') {
      this.advancedChecked = false;
    }
  }
}
