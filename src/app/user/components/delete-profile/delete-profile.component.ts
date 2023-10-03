import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss'],
})
export class DeleteProfileComponent {
  isCheckboxChecked = false;
  accountDeleted: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  deleteAccount() {
    if (this.isCheckboxChecked) {
      const userId = this.authService.getUserData()?.id as number;
      this.usersService.deleteUserAccount(userId).subscribe(() => {
        this.accountDeleted = true;
        this.toastr.success('Accound deleted');
      });
    }
  }
}
