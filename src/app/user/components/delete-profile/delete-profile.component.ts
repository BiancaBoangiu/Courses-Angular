import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss'],
})
export class DeleteProfileComponent {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  deleteAccount() {
    const userId = this.authService.loggedUser.id;
    this.usersService.deleteUserAccount(userId).subscribe();
  }
}
