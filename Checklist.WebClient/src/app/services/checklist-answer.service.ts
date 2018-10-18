import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AuthService } from '../common/auth/auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const apiUrl = environment.apiUrl;

@Injectable()
export class ChecklistAnswerService {
  constructor(private http: Http, private authService: AuthService) { }

  getChecklistQuestion(id) {
    return this.authService.AuthGet(apiUrl + '/UserAnswer/GetChecklistQuestion?id=' + id).map((response: Response) => response.json());
  }

  saveChecklistAnswer(data) {
    return this.authService.AuthPost(apiUrl + '/UserAnswer/SaveChecklistAnswer', data);
  }

  getResultAnswer(checklistId, resultId) {
    return this.authService.AuthGet(apiUrl + '/Result/GetResultAnswer?checklistId=' + checklistId + '&resultId=' + resultId).map((response: Response) => response.json());
  }


}
