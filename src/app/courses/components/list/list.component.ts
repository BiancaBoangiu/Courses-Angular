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
  categories = [
    'All',
    'Programming and Software Development',
    'Web Development',
    'Mobile DevelopmentMobile App Development',
    'Data Science and Machine Learning',
    'Cybersecurity',
    'Cloud Computing',
  ];
  activeLevelButton: string = '';
  activePriceButton: string = '';
  activeCategoryButton: string = '';
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

  showCoursesByCategory(category: string) {
    this.activeCategoryButton = category;
    if (category === 'All') {
      this.courseService.getCourses().subscribe((courses) => {
        this.courses = courses;
      });
    } else {
      this.courseService.getCategories().subscribe((categories) => {
        const courseCategory = categories.filter(
          (courseCategory) => courseCategory.name === category
        );

        this.categoryId = courseCategory[0].id;
        this.courseService
          .getCoursesByCategory(this.categoryId)
          .subscribe((courses) => {
            this.courses = courses;
          });
      });
    }
  }

  getCategoryId(categoryName: string) {
    this.courseService.getCategories().subscribe((categories) => {
      const category = categories.filter(
        (category) => category.name === categoryName
      );

      return category[0].id;
    });
  }
}
