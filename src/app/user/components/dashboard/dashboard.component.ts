import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  totalCourses!: number;

  showTotalCourses(totalCourses: number) {
    this.totalCourses = totalCourses;
  }
}
