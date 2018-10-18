import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { LoginComponent } from './login.component';
import { AuthService } from '../common/auth/auth.service';
import { UserService } from '../services/user.service';

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgSelectModule
  ],
  exports: [
    ReactiveFormsModule

  ],
  //providers:[UserService]
})
export class LoginModule {
  static routes = routes;
}
