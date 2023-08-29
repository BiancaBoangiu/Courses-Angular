import { InstructorsService } from '../instructors/services/instructors.service';
import { CoursesService } from './../courses/services/courses.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  numberOfCourses!: number;
  numberOfInstructors!: number;

  constructor(
    private CoursesService: CoursesService,
    private instructorsService: InstructorsService
  ) {}

  ngOnInit() {
    this.showNumberOfCourses();
    this.showNumberOfInstructors();
  }

  showNumberOfCourses() {
    this.CoursesService.getCourses().subscribe((courses) => {
      this.numberOfCourses = courses.length;
    });
  }

  showNumberOfInstructors() {
    this.instructorsService.getInstructors().subscribe((instructors) => {
      this.numberOfInstructors = instructors.length;
    });
  }

  showNumberOfUsers() {}
}
