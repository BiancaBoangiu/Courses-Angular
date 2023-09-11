import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../models/user-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  user!: User;
  editForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      description: [''],
      education: [''],
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = this.authService.loggedUser.id;
    this.authService.getUserById(userId).subscribe((user) => {
      this.user = user;
    });
  }

  onSubmit(): void {
    // this.formSubmitted = true;
    const firstNameValue = this.editForm.get('email')?.value;
    const lastNameValue = this.editForm.get('password')?.value;
    const descriptionValue = this.editForm.get('userType')?.value;
    const educationValue = this.editForm.get('selectedImage')?.value;
    const userId = this.authService.loggedUser.id;

    if (this.editForm.invalid) {
      return;
    } else {
      this.usersService
        .updateUserInfo(
          firstNameValue,
          lastNameValue,
          descriptionValue,
          educationValue,
          userId
        )
        .subscribe((user) => {
          console.log(user);
        });
    }
  }
}
