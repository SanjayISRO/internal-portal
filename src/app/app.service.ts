import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isRegisterClicked = new BehaviorSubject(false);
  checkFlagValue = this.isRegisterClicked.asObservable();

  usersList: Array<object> = [
    {
      name: 'sanjay',
      email: 'sanjay@genesys.com',
      isAdmin: false
    },
    {
      name: 'kural',
      email: 'kural@genesys.com',
      isAdmin: true
    },
    {
      name: 'prasad',
      email: 'prasad@genesys.com',
      isAdmin: true
    }
  ]

  constructor() { }

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

  getUserListData(userName): object {
    return this.usersList.find(e => e['name'] === userName);
  }
 }
