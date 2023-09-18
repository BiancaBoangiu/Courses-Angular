import { Component, Input } from '@angular/core';
import { Course } from 'src/app/courses/models/course.interface';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss'],
})
export class WishlistCardComponent {
  @Input() course!: Course;
}
