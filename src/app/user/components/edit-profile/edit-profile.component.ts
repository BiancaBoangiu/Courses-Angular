import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/auth/models/auth.interface';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  user!: Auth;
  editForm!: FormGroup;
  newPassword: string = '';
  imagesShown: boolean = false;
  selectedImageSrc: string = '';
  passwordShown: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.loggedUser$.subscribe((user) => {
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
    const userId = this.authService.getUserData()?.id as number;

    if (this.editForm.invalid) {
      this.toastr.error("Profile can't be saved");
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
          this.toastr.success('Profile information saved');
          this.authService.updateUser(user);
        });
    }
  }

  saveNewPassword() {
    if (this.newPassword) {
      this.usersService
        .updateNewPassword(this.newPassword, this.user.id)
        .subscribe((user) => {
          this.newPassword = '';
          this.toastr.success('Password saved');
        });
    } else {
      this.toastr.error("Password can't be saved");
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
        this.authService.updateUser(user);
        const userNotificationsStatus =
          this.authService.getUserData()?.hideNotifications;
        if (userNotificationsStatus) {
          this.usersService.showToastrMessage(
            'Profile picture saved',
            userNotificationsStatus
          );
        }

        this.imagesShown = false;
      });
  }

  togglePasswordVisibility() {
    this.passwordShown = !this.passwordShown;
  }
}
