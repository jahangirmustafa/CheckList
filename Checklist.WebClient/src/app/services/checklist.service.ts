import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AuthService } from '../common/auth/auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const apiUrl = environment.apiUrl;

@Injectable()
export class ChecklistService {

  constructor(private http: Http, private authService: AuthService) { }

  createChecklist(data) { 
    return this.authService.AuthPost(apiUrl + '/Checklist/CreateChecklist', data);
  }

  updateChecklist(data) {
    return this.authService.AuthPost(apiUrl + '/Checklist/UpdateChecklist', data);
  }

  addHeading(data) {
    return this.authService.AuthPost(apiUrl + '/Checklist/AddHeading', data);
  }

  getChecklist() {   
    return this.authService.AuthGet(apiUrl + '/Checklist/GetChecklist').map((response: Response) => response.json());
  }

  getHeaderByChecklistId(id) {
    return this.authService.AuthGet(apiUrl + '/Checklist/GetHeaderByChecklistId?id=' + id).map((response: Response) => response.json());
  }

  getHeadingByType(id) {
    return this.authService.AuthGet(apiUrl + '/Checklist/GetHeadingsByType?id=' + id).map((response: Response) => response.json());
  }

  saveQuestion(data) {
    return this.authService.AuthPost(apiUrl + '/Checklist/SaveQuestion', data);
  }

  getQuestions(id) {
    return this.authService.AuthGet(apiUrl + '/Checklist/GetAllQuestion?id=' + id).map((response: Response) => response.json());
  }

  deleteQuestions(id) {
    return this.authService.AuthGet(apiUrl + '/Checklist/DeleteQuestion?id=' + id).map((response: Response) => response.json());
  }

  getChecklistForUser() {
    return this.authService.AuthGet(apiUrl + '/Checklist/GetChecklistForUser').map((response: Response) => response.json());
  }

}
