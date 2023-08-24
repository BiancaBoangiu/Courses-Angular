import { Component, Input } from '@angular/core';
import { Instructor } from '../../models/instructor-interface';

@Component({
  selector: 'app-instructor-list-card',
  templateUrl: './instructor-list-card.component.html',
  styleUrls: ['./instructor-list-card.component.scss'],
})
export class InstructorListCardComponent {
  @Input() instructor!: Instructor;
}
