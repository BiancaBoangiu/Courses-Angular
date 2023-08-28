import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorsSectionComponent } from './components/instructors-section/instructors-section.component';
import { InstructorDetailsComponent } from './components/instructor-details/instructor-details.component';
import { RegisterInstructorComponent } from './components/register-instructor/register-instructor.component';

const routes: Routes = [
  { path: 'register-instructor', component: RegisterInstructorComponent },
  { path: '', component: InstructorsSectionComponent },
  { path: ':id', component: InstructorDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorsRoutingModule {}
