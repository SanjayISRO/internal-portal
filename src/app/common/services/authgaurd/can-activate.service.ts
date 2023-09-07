import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';

import { AppService } from '../../../app.service';

@Injectable({
  providedIn: "root"
})

export class CanActivateService implements CanActivate {

  constructor(private appService: AppService, private router : Router) { 
  }

  canActivate(): boolean {
    // const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    // if (!userDetails) {
    //     this.router.navigateByUrl('login')
    //     return false
    // }
    // const loggedInUser = this.appService.getUserListData(userDetails['name']);
    // if (!loggedInUser['isAdmin']) {
    //   this.router.navigateByUrl('faq')
    //   return false;
    // }
    return true
  }

}
