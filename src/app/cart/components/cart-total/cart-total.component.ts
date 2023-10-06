import { Component, Input } from '@angular/core';
import { Course } from 'src/app/courses/models/course.interface';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss'],
})
export class CartTotalComponent {
  @Input() cartTotal!: number;
}
