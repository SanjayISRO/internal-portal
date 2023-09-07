import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpService } from './../../../common/services/http.service';




@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {

  constructor(private httpService: HttpService) { }

  saveFormData(formFields: Object, eventName: string, dateAndTime: object, method: string, url: string): Observable<object> {
    const reqBody = {
      eventName: eventName,
      details: {...formFields, ...dateAndTime}
    }
    return this.httpService[method]( url, reqBody)
  }

  getTeamNames(eventName: string): Observable<any> {
    return this.httpService.post(`listOfTeamNames`, {eventName: eventName})
  }

  getEditDetails(formFields: object, eventName: string): Observable<any> {
    const obj = {
      teamName: formFields['teamName'],
      secretKey: formFields['secretKey'],
      eventName: eventName
    }
    return this.httpService.post('getEditDetails', obj)
  }
}
