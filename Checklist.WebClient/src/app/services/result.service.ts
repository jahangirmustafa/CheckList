import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AuthService } from '../common/auth/auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const apiUrl = environment.apiUrl;

@Injectable()
export class ResultService {
  constructor(private http: Http, private authService: AuthService) { }

  getResult(hubName, year, employementType) {
    return this.authService.AuthGet(`${apiUrl}/Result/GetResult?hubName=${hubName}&year=${year}&employementType=${employementType}`)
      .map((response: Response) => response.json());
  }

  //saveChecklistAnswer(data) {
  //  return this.authService.AuthPost(apiUrl + '/UserAnswer/SaveChecklistAnswer', data);
  //}

  getHubItems() {
    return this.authService.AuthGet(apiUrl + '/Result/GetHubItems').map((response: Response) => response.json());
  }

  deleteResult(id) {
    return this.authService.AuthGet(apiUrl + '/Result/DeleteResult?resultId=' + id).map((response: Response) => response.json());
  }
  

}
