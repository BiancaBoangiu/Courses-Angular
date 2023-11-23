import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/components/main/main.component';
import { AuthGuard } from './auth/services/auth.guard';
import { UserGuard } from './auth/services/user.guard';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  {
    path: 'user',
    canActivate: [AuthGuard, UserGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'instructors',
    loadChildren: () =>
      import('./instructors/instructors.module').then(
        (m) => m.InstructorsModule
      ),
  },
  {
    path: 'cart',
    canActivate: [AuthGuard, UserGuard],
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
