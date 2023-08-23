import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  emailAlreadyUsed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        userType: ['', Validators.required],
        confirmedPassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmedPassword = group.get('confirmedPassword')?.value;

    return password === confirmedPassword ? null : { passwordsNotMatch: true };
  }

  onSubmit(): void {
    const emailValue = this.registerForm.get('email')?.value;
    const passwordValue = this.registerForm.get('password')?.value;
    const confirmedPasswordValue =
      this.registerForm.get('confirmedPassword')?.value;
    const userType = this.registerForm.get('userType')?.value;

    if (!emailValue || !passwordValue || !confirmedPasswordValue || !userType) {
      return;
    } else {
      this.authService.verifyUser(emailValue).subscribe((response) => {
        this.emailAlreadyUsed = false;
        if (response.length > 0) {
          this.emailAlreadyUsed = true;
        } else {
          this.authService
            .registerUser(emailValue, passwordValue, userType)
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
