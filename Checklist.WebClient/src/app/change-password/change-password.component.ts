import { Component, HostBinding, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../common/auth/auth.service';
import { environment } from '../../environments/environment';
import { PasswordModel } from '../common/models/password.model';
import { UserService } from '../services/user.service';
import { CurrentUser } from '../common/models/current-user.model';

const apiUrl = environment.apiUrl; 

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @HostBinding('class') classes = 'login-page app';

  changePasswordForm: FormGroup;
  model: PasswordModel;
  userList: any;
  selectedUserName: string;
  showInvalidLogin: boolean = false;  
  //currentUserName: string;
  errorMessage: string;
  showError: boolean = false;
  successMessage: string;
  showSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService) {
    this.model = new PasswordModel({});
    this.changePasswordForm = this.createForm();
  }

  ngOnInit() {
    this.loadUserList();
    //this.userService.currentUserNameMessage.subscribe(message => this.currentUserName = message);
    //if (this.currentUserName == '') {
    //  this.router.navigate(['/login']);
    //}
  }

  loadUserList() {
    this.userService.getAll().subscribe((res) => {
      this.userList = res;
    });
  }
  
  createForm() {
    return this.formBuilder.group({
      username: [this.model.username],
      oldPassword: [this.model.oldPassword],     
      passwords: this.formBuilder.group({
        newPassword: [this.model.newPassword, [Validators.required]],
        confirmPassword: [this.model.confirmPassword, [Validators.required]],
      }, { validator: this.passwordConfirming })

    });
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('confirmPassword').value) {      
      return { invalid: true };
    }
  }

  changePassword() {debugger
    let formData = this.changePasswordForm.getRawValue();
    this.userService.changePassword(formData.username.text, formData.oldPassword, formData.passwords.newPassword).subscribe(
      (res) => {
        this.successMessage = res.json();
        this.showSuccess = true;
        this.showError = false;
        this.model = new PasswordModel({});
        this.changePasswordForm = this.createForm();
      },

      (err) => {
        this.errorMessage = err.json();
        this.showError = true;
        this.showSuccess = false;
      }
    );
  }

}
