import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  profileVisibility: boolean = false;
  emailNotifications: boolean = false;
  smsConfirmation: boolean = false;
  hideNotifications: boolean = false;
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const user = this.authService.getUserData();
    if (user) {
      this.profileVisibility = user.profileVisibility;
      this.smsConfirmation = user.smsConfirmation;
      this.emailNotifications = user.emailNotificaions;
      this.hideNotifications = user.hideNotifications;
    }
  }

  saveSettings() {
    const userId = this.authService.getUserData()?.id;
    if (userId) {
      this.usersService
        .saveSettings(
          userId,
          this.profileVisibility,
          this.emailNotifications,
          this.smsConfirmation,
          this.hideNotifications
        )
        .subscribe((user) => {
          this.authService.updateUser(user);
          this.toastr.success('Profile settings saved');

          this.profileVisibility = user.profileVisibility;
          this.smsConfirmation = user.smsConfirmation;
          this.emailNotifications = user.emailNotificaions;
          this.hideNotifications = user.hideNotifications;
        });
    }
  }
}
