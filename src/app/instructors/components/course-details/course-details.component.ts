import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCourseService } from '../../services/create-course.service';

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
    private createCouseService: CreateCourseService
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
    const title: string = this.courseForm.get('title')?.value;
    const description: string = this.courseForm.get('description')?.value;
    const category: string = this.courseForm.get('category')?.value;
    const level: string = this.courseForm.get('level')?.value;
    const time: number = this.courseForm.get('time')?.value;
    const premium: string = this.courseForm.get('premium')?.value;
    const certificate: string = this.courseForm.get('certificate')?.value;
    const price: number = this.courseForm.get('price')?.value;

    const courseDetails = {
      name: title,
      description: description,
      category: category,
      experience: level,
      time: time,
      premium: premium,
      certificate: certificate,
      price: price,
    };

    if (this.courseForm.valid) {
      this.createCouseService.courseDetails$.next(courseDetails);
    } else {
      return;
    }
  }
}
