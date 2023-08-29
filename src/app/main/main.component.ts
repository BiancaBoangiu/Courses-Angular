import { InstructorsService } from '../instructors/services/instructors.service';
import { CoursesService } from './../courses/services/courses.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(
    private CoursesService: CoursesService,
    private instructorsService: InstructorsService
  ) {}
}
