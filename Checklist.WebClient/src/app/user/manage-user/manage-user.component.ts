import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthService } from '../../common/auth/auth.service';
import { UserService } from '../../services/user.service';
import { PasswordModel } from '../../common/models/password.model';
import { UserModel } from '../../common/models/user.model';

declare let jQuery: any;

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  @ViewChild('passwordWindow') public passwordWindow: ModalDirective;
  @ViewChild('confirmWindow') public confirmWindow: ModalDirective;
  @ViewChild('createUserWindow') public createUserWindow: ModalDirective;
  
  data: any[];
  changePasswordForm: FormGroup;
  model: PasswordModel;

  deleteMessage: string = 'Are you sure to delete?';
  selectedId: number;
  deleteId: number;
 
  createUserForm: FormGroup;
  userModel: UserModel;
  roleList: any[] = [{ id: 2, text: 'SubAmin' }, { id: 3, text: 'User' }];
  selectedRole: any;
  subAdminList: any;
  selectedSubAdmin: any;
  showSubAdmin: boolean = false;
  userErrorMessage: string;
  showUserError: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder) {
    this.model = new PasswordModel({});
    this.changePasswordForm = this.createForm();

    this.userModel = new UserModel({});
    this.createUserForm = this.createNewUserForm();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadSubAdmin();
  }

  loadUsers() {
    this.userService.getAllUser().subscribe((res) => {
      this.data = res;
    });
  }

  showPassword(id) {    
    this.changePasswordForm = this.createForm();
    this.selectedId = id;
    this.passwordWindow.show();
  }

  createForm() {
    return this.formBuilder.group({    
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

  updatePassword() {
    let id = this.selectedId;
    let formData = this.changePasswordForm.getRawValue();
    let data = { id: id, password: formData.passwords.newPassword };
    this.userService.updatePassword(data).subscribe((res) => {
      this.passwordWindow.hide();

    });
  }

  confirmDelete(id, role) {
    if (role == 'SubAdmin') 
      this.deleteMessage = 'If you delete a SubAdmin its Users will also get deleted with SubAdmin. Are you sure to delete?';
    else
      this.deleteMessage = 'If you delete this user all results related to this user will be deleted. Are you sure to delete?';

    this.deleteId = id;
    this.confirmWindow.show();
  }

  deleteUser() {
    this.userService.delete(this.deleteId).subscribe(
      (res) => {
        this.loadUsers();
        this.confirmWindow.hide();
      },

      (err) => {
        this.deleteMessage = 'Sub-Admin Id being used in Checklist. Delete Sub-Admin from all Checklists.';       
      }
      
    );
  }


  createNewUserForm() {
    return this.formBuilder.group({
      firstName: this.userModel.firstName,
      lastName: this.userModel.lastName,
      username: this.userModel.username,
      role: null,
      userSubAdmin: null,
      passwords: this.formBuilder.group({
        newPassword: [this.model.newPassword, [Validators.required]],
        confirmPassword: [this.model.confirmPassword, [Validators.required]],
      }, { validator: this.passwordConfirming })

    });
  }

  showCreateUser() {
    this.loadSubAdmin();
    this.createUserForm = this.createNewUserForm();
    this.showUserError = false;
    this.createUserWindow.show();
  }

  onRoleChange($event) {
    if ($event.text == 'User')
      this.showSubAdmin = true;
    else {
      this.createUserForm.get('userSubAdmin').clearValidators();
      this.createUserForm.get('userSubAdmin').updateValueAndValidity();
      this.showSubAdmin = false;
    }
  }

  loadSubAdmin() {
    this.userService.getSubAdmin().subscribe((res) => {
      this.subAdminList = res;
    });
  }

  postNewUser() {
    let formData = this.createUserForm.getRawValue();
    let data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      role: formData.role,
      UserSubAdminId: formData.userSubAdmin,
      password: formData.passwords.newPassword,
    };

    this.userService.createUser(data).subscribe(
      (res) => {
      this.loadUsers();
      this.createUserWindow.hide();
      },

      (err) => {
        this.userErrorMessage = err.json();
        this.showUserError = true;
      }

    );

  }


}


