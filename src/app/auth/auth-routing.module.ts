import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterInstructorComponent } from '../instructors/components/register-instructor/register-instructor.component';
import { ListComponent } from '../courses/components/list/list.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-instructor-auth', component: RegisterInstructorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
