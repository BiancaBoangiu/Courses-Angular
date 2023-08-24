import { Component } from '@angular/core';
import { Instructor } from '../../models/instructor-interface';
import { InstructorsService } from '../../services/instructors.service';

@Component({
  selector: 'app-instructors-list',
  templateUrl: './instructors-list.component.html',
  styleUrls: ['./instructors-list.component.scss'],
})
export class InstructorsListComponent {
  instructors!: Instructor[];

  constructor(private instructorsService: InstructorsService) {}
  ngOnInit() {
    this.instructorsService.getInstructors().subscribe((instructors) => {
      this.instructors = instructors;
    });
  }
}
