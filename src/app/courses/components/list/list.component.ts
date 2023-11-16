import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.interface';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  experienceLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  priceLevel = ['All', 'Free', 'Premium'];
  courseCategories!: Category[];
  categoryId!: number;
  categories!: Category[];
  activeLevelButton: string = '';
  activePriceButton: string = '';
  activeCategoryButton: string = '';
  courses: Course[] = [];
  areCoursesLoading!: boolean;
  areCategoriesLoading!: boolean;

  sortSelection = '';

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.areCoursesLoading = true;

    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.areCoursesLoading = false;
    });

    this.courseService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
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

  showCoursesByCategory(category: string, categoryId: number) {
    this.areCategoriesLoading = true;
    this.activeCategoryButton = category;

    this.courseService.getCoursesByCategory(categoryId).subscribe((courses) => {
      this.courses = courses;
      this.areCategoriesLoading = false;
    });
  }
}
