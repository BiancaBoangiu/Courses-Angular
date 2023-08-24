import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorsSectionComponent } from './components/instructors-section/instructors-section.component';
import { InstructorDetailsComponent } from './components/instructor-details/instructor-details.component';

const routes: Routes = [
  { path: '', component: InstructorsSectionComponent },
  { path: ':id', component: InstructorDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorsRoutingModule {}
