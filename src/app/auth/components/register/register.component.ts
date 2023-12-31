import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorsService } from 'src/app/instructors/services/instructors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  emailAlreadyUsed: boolean = false;
  formSubmitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmedPassword: ['', Validators.required],
        selectedImage: ['', Validators.required],
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const passwordValue = group.get('password')?.value;
    const confirmedPasswordValue = group.get('confirmedPassword')?.value;

    if (passwordValue === confirmedPasswordValue) {
      return null;
    } else {
      return { passwordsNotMatch: true };
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;
    const emailValue = this.registerForm.get('email')?.value;
    const passwordValue = this.registerForm.get('password')?.value;
    const selectedImageValue = this.registerForm.get('selectedImage')?.value;
    const userType = 0;

    if (this.registerForm.invalid) {
      return;
    } else {
      this.authService.verifyUser(emailValue).subscribe((response) => {
        this.emailAlreadyUsed = false;
        if (response.length > 0) {
          this.emailAlreadyUsed = true;
        } else {
          this.authService
            .registerUser(
              emailValue,
              passwordValue,
              userType,
              selectedImageValue
            )
            .pipe(
              catchError((error) => {
                console.error(error);
                alert('Error: ' + error.message);
                return throwError(error);
              })
            )
            .subscribe((response) => {
              this.authService.updateUser(response);
              this.router.navigate(['/']);
            });
        }
      });
    }
  }
}
