import {Component, HostBinding, Injector, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { AuthService } from '../common/auth/auth.service';
import { environment } from '../../environments/environment';
import { LoginModel } from '../common/models/login.model';
import { UserService } from '../services/user.service';
import { CurrentUser } from '../common/models/current-user.model';

const apiUrl = environment.apiUrl; 

@Component({
  selector: 'app-login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html'
})
export class LoginComponent {
  @HostBinding('class') classes = 'login-page app';
   
  loginForm: FormGroup;
  model: LoginModel;
  showInvalidLogin: boolean = false;
  userList: any;
  selectedUserName: string;
  //userNameShare: string;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService) {
    this.model = new LoginModel({});
    this.loginForm = this.createForm(); 
  }

  ngOnInit() {
    this.authService.logout();    
    this.loadUserList();
  }

  loadUserList() {
    this.userService.getAll().subscribe((res) => {      
      this.userList = res;
    });
  }

  createForm() {
    return this.formBuilder.group({
      username: [this.model.username],
      password: [this.model.password]      
    });
  }

  postLogin() {
    let formData = this.loginForm.getRawValue();
    this.authService.login(formData.username.text, formData.password).subscribe(
      (res) => {
        if (res.ok) {
          this.router.navigate(['/app/dashboard']);
        }
      },

      (err) => {
        if (err.status == 401) {
          this.showInvalidLogin = true;
        }
      }
    );
  }

  changePassword() {
    //let formData = this.loginForm.getRawValue();
    //this.userService.changeUserName(formData.username.username);
    this.router.navigate(['/change-password']);
  } 
  

}






