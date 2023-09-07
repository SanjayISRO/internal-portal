import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpService } from './common/services/http.service';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  isRegisterClicked = new BehaviorSubject(false);
  checkFlagValue = this.isRegisterClicked.asObservable();

  configData = new BehaviorSubject({});
  registerdUserDetailsData = new BehaviorSubject({});

  constructor(private httpService: HttpService) { }

  setFlagValue(flagValue: boolean): void {
    this.isRegisterClicked.next(flagValue)
  }

  scrollToTop(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  // getUserListData(userName): object {
  //   return this.usersList.find(e => e['name'] === userName);
  // }


  getConfigData(): Observable<object> {
    return this.httpService.get('getConfigData');
  }

  setConfigData(data: object): void {
    this.configData.next(data);
  }

  fetchConfigData(): Observable<object> {
    return this.configData.asObservable();
  }

  validateUsers(userName: string, password: string): Observable<object> {
    return this.httpService.post('validateUser', {name: userName, password: password});
  }

  setRegisteredUserDetailsData(data: object): void {
    this.registerdUserDetailsData.next(data);
  }

  getRegisteredUserDetailsData(): Observable<object> {
    return this.registerdUserDetailsData.asObservable();
  }

  getRegisteredList(): Observable<object> {
    return this.httpService.get('registeredList')
  }

 }
