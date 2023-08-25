import { Component } from '@angular/core';
import { Instructor } from '../../models/instructor-interface';
import { InstructorsService } from '../../services/instructors.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/courses/models/course.interface';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.scss'],
})
export class InstructorDetailsComponent {
  instructor!: Instructor;
  courses!: Course[];
  numberOfCourses!: number;

  constructor(
    private instructorsService: InstructorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.instructorsService.getInstructorById(id).subscribe((instructor) => {
      this.instructor = instructor;
    });

    this.instructorsService.getInstructorCourses(id).subscribe((courses) => {
      this.courses = courses;
      this.numberOfCourses = this.courses.length;
    });
  }
}
