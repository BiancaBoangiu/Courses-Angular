import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorsService } from '../../services/instructors.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  courseForm!: FormGroup;
  formSubmitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private instructorsService: InstructorsService,
    private stepper: MatStepper
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required],
      time: ['', Validators.required],
      premium: ['', Validators.required],
      certificate: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  saveCourseDetails() {
    this.formSubmitted = true;
    const title = this.courseForm.get('title')?.value;
    const description = this.courseForm.get('description')?.value;
    const category = this.courseForm.get('category')?.value;
    const level = this.courseForm.get('level')?.value;
    const time = this.courseForm.get('time')?.value;
    const premium = this.courseForm.get('premium')?.value;
    const certificate = this.courseForm.get('certificate')?.value;
    const price = this.courseForm.get('price')?.value;

    const courseDetails = {
      title: title,
      description: description,
      category: category,
      level: level,
      time: time,
      premium: premium,
      certificate: certificate,
      price: price,
    };

    console.log(courseDetails);

    if (this.courseForm.valid) {
      this.instructorsService.courseDetails = courseDetails;
      this.stepper.next();
    } else {
      return;
    }
  }
}
