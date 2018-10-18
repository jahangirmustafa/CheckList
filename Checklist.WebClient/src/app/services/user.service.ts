import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AuthService } from '../common/auth/auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const apiUrl = environment.apiUrl; 

@Injectable()
export class UserService {

  constructor(private http: Http, private authService: AuthService) { }

  
  getAllUser() {
    return this.authService.AuthGet(apiUrl + '/users/GetAllUser').map((response: Response) => response.json());
  }

  getAll() {
    return this.http.get(apiUrl + '/users').map((response: Response) => response.json());
  }

  getSubAdmin() {
    return this.authService.AuthGet(apiUrl + '/users/GetSubAdmin').map((response: Response) => response.json());
  }

  changePassword(username: string, oldPassword: string, newPassword: string) {
    let data = { username: username, oldPassword: oldPassword, newPassword: newPassword };
    let body = JSON.stringify(data);

    let header = new Headers();
    header.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: header });

    return this.http.post(apiUrl + '/users/ChangePassword', body, options)
      .map((response: Response) => {       
        return response;
      })
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  updatePassword(data) {    
    return this.authService.AuthPost(apiUrl + '/users/UpdatePassword', data);
  }

  delete(id: number) {
    return this.authService.AuthDelete(apiUrl + '/users/' + id);
  }

  createUser(data) {
    return this.authService.AuthPost(apiUrl + '/users/CreateUser', data);
  }
    
}
