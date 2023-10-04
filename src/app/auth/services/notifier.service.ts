import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class notifierService {
  constructor(
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  showNotifications(message: string) {
    const shouldShowNotifications =
      this.authService.getUserData()?.hideNotifications;
    if (shouldShowNotifications) {
      return;
    } else {
      this.toastr.success(message);
    }
  }

  showError(message: string) {
    this.toastr.error(message);
  }
}
