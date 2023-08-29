import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorsService } from '../../services/instructors.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register-instructor',
  templateUrl: './register-instructor.component.html',
  styleUrls: ['./register-instructor.component.scss'],
})
export class RegisterInstructorComponent {
  registerInstructor!: FormGroup;
  emailAlreadyUsed!: boolean;

  constructor(
    private instructorsService: InstructorsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerInstructor = this.fb.group({
      name: ['', Validators.required],
      skills: ['', Validators.required],
      education: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const nameValue = this.registerInstructor.get('name')?.value;
    const skillsValue = this.registerInstructor.get('skills')?.value;
    const educationValue = this.registerInstructor.get('education')?.value;
    const addressValue = this.registerInstructor.get('address')?.value;
    const phoneNumberValue = this.registerInstructor.get('phoneNumber')?.value;
    const descriptionValue = this.registerInstructor.get('description')?.value;

    if (this.registerInstructor.invalid) {
      return;
    } else {
      this.instructorsService
        .verifyUser(this.instructorsService.instructorEmail)
        .subscribe((response) => {
          this.emailAlreadyUsed = false;
          if (response.length > 0) {
            this.emailAlreadyUsed = true;
          } else {
            this.instructorsService
              .registerInstructor(
                this.instructorsService.instructorEmail,
                this.instructorsService.instructorPassword,
                nameValue,
                skillsValue,
                educationValue,
                phoneNumberValue,
                addressValue,
                descriptionValue
              )
              .pipe(
                catchError((error) => {
                  console.error(error);
                  alert('Error: ' + error.message);
                  return throwError(error);
                })
              )
              .subscribe(() => {
                this.router.navigate(['/']);
              });
          }
        });
    }
  }
}
