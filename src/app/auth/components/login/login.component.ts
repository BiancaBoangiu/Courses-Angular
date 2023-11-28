import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidAccount: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    const rememberMe = this.loginForm.get('rememberMe')?.value;
    const emailValue = this.loginForm.get('email')?.value;
    const passwordValue = this.loginForm.get('password')?.value;

    this.authService
      .verifyUser(emailValue)
      .subscribe(([userData, instructorData]) => {
        if (userData && passwordValue === userData.password) {
          this.authService.updateUser(userData);

          this.authService.login(userData.id, rememberMe);

          this.router.navigate(['/']);
        } else if (
          instructorData &&
          passwordValue === instructorData.password
        ) {
          this.authService.updateUser(instructorData);
        } else {
        }

        this.invalidAccount = true;
      });
  }
}
