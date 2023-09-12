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
  newPassword: string = '';
  passwordSaved: boolean = false;
  imagesShown: boolean = false;
  selectedImageSrc: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = this.authService.loggedUser.id;
    this.authService.getUserById(userId).subscribe((user) => {
      this.user = user;
      this.editForm = this.fb.group({
        firstName: [this.user.firstName || '', Validators.required],
        lastName: [this.user.lastName || '', Validators.required],
        description: [this.user.description || ''],
        education: [this.user.education || ''],
      });
    });
  }

  onSubmit(): void {
    const firstNameValue = this.editForm.get('firstName')?.value;
    const lastNameValue = this.editForm.get('lastName')?.value;
    const descriptionValue = this.editForm.get('description')?.value;
    const educationValue = this.editForm.get('education')?.value;
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
          this.user = user;
        });
    }
  }

  saveNewPassword() {
    if (this.newPassword) {
      this.usersService
        .updateNewPassword(this.newPassword, this.user.id)
        .subscribe((user) => {
          this.newPassword = '';
          this.passwordSaved = true;
        });
    } else {
      return;
    }
  }

  showImageOptions() {
    this.imagesShown = true;
  }

  saveImageSrc(src: string) {
    this.selectedImageSrc = src;
  }

  saveNewProfileImage() {
    this.usersService
      .updateNewProfileImage(this.selectedImageSrc, this.user.id)
      .subscribe((user) => {
        this.user = user;
        this.imagesShown = false;
      });
  }
}
