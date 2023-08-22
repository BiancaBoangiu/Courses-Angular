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
  selectedSortOption: string = '0';
  allPriceChecked: boolean = false;
  freeChecked: boolean = false;
  premiumChecked: boolean = false;

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

    if (this.allChecked || this.allPriceChecked) {
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
    if (selectedLevel !== 'free') {
      this.freeChecked = false;
    }
    if (selectedLevel !== 'premium') {
      this.premiumChecked = false;
    }
    if (selectedLevel !== 'allPrice') {
      this.allPriceChecked = false;
    }
  }

  sort(selectedOption: string) {
    console.log(selectedOption);
    if (selectedOption === '1') {
      this.courseService.getCourses().subscribe((courses) => {
        const coursesByRatingAscending = courses.sort(
          (a, b) => a.rating - b.rating
        );
        this.courses = coursesByRatingAscending;
      });
    }

    if (selectedOption === '2') {
      this.courseService.getCourses().subscribe((courses) => {
        const coursesByRatingDescending = courses.sort(
          (a, b) => b.rating - a.rating
        );
        this.courses = coursesByRatingDescending;
      });
    }

    if (selectedOption === '3') {
      this.courseService.getCourses().subscribe((courses) => {
        const coursesByPriceAscending = courses.sort(
          (a, b) => a.price - b.price
        );
        this.courses = coursesByPriceAscending;
      });
    }

    if (selectedOption === '4') {
      this.courseService.getCourses().subscribe((courses) => {
        const coursesByPriceDescending = courses.sort(
          (a, b) => b.price - a.price
        );
        this.courses = coursesByPriceDescending;
      });
    }

    if (selectedOption === '5') {
      this.courseService.getCourses().subscribe((courses) => {
        const coursesByPopularity = courses.sort((a, b) => b.views - a.views);
        this.courses = coursesByPopularity;
      });
    }
  }

  showCoursesByPriceLevel(level: string) {
    this.deselectOtherLevels(level);
    if (level === 'all') {
      this.allPriceChecked = !this.allPriceChecked;
    }

    if (level === 'free') {
      this.freeChecked = !this.freeChecked;
    }

    if (level === 'premium') {
      this.premiumChecked = !this.premiumChecked;
    }

    if (this.allPriceChecked) {
      this.courseService
        .getCourses()
        .subscribe((courses) => (this.courses = courses));
    } else {
      if (this.freeChecked) {
        this.courseService.getCourses().subscribe((courses) => {
          const coursesByFreeLevel = courses.filter(
            (course: Course) => course.price === 0
          );
          this.courses = coursesByFreeLevel;
        });
      } else if (this.premiumChecked) {
        this.courseService.getCourses().subscribe((courses) => {
          const coursesByPremiumLevel = courses.filter(
            (course: Course) => course.price > 0
          );
          this.courses = coursesByPremiumLevel;
        });
      } else {
        this.courseService
          .getCourses()
          .subscribe((courses) => (this.courses = courses));
      }
    }
  }
}
