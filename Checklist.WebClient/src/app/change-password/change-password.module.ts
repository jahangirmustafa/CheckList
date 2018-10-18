import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { ChangePasswordComponent } from './change-password.component';
import { AuthService } from '../common/auth/auth.service';
import { UserService } from '../services/user.service';


export const routes = [
  { path: '', component: ChangePasswordComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ChangePasswordComponent
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
  //providers: [UserService]
})
export class ChangePasswordModule {
  static routes = routes;
}
