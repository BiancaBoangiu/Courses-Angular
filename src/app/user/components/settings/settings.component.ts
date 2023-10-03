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
        });
    }
  }
}
