import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthService } from './common/auth/auth.service';

export const ROUTES: Routes = [{
   path: '', redirectTo: 'app', pathMatch: 'full'
  },
  {
    path: 'app', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard]
  },
  {
    path: 'login', loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordModule'
  },
  {
    path: 'error', component: ErrorComponent
  },
  {
    path: '**',    component: ErrorComponent
  }
];

export const authProviders = [
  AuthGuard,
  AuthService
];
