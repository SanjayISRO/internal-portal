import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


import { AppService } from '../../app.service';
import { ConfigJson, EventNamesObject } from '../../common/models/config-json'
import { EVENT_NAMES } from './models/registration-form.contants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  readonly eventNames = EVENT_NAMES;
  selectedValue: string = null;
  subscriptions: Subscription[] = [];
  successOrErrorMessage: string = null;
  dataSavedSucessfully: boolean = false;
  checkBoxValue: boolean = false;


  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.appService.fetchConfigData().subscribe((data: ConfigJson) => {
        if (data &&  typeof data !== 'string' && Object.keys(data).length) {
        this.selectedValue = data.registrationFormConfigs.eventNames.find((eventName: EventNamesObject) => eventName.isSelected)['name']
        } else if (data && typeof data === 'string') {
          this.successOrErrorMessage = data;
          this.dataSavedSucessfully = false;
          this.closeSuccessOrErrorMsg();
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe)
  }

  showMessage(obj: object): void {
    this.successOrErrorMessage = obj['message'];
    this.dataSavedSucessfully = obj['flag'];
    this.closeSuccessOrErrorMsg();
    this.checkBoxValue = false;
    if (obj['flag']) {
      setTimeout(() => {
        this.router.navigateByUrl('/genesysindiainnovation');
      }, 1000);
    }
  }

  closeSuccessOrErrorMsg(): void {
    setTimeout(() => {
      this.successOrErrorMessage = '';
    }, 3000);
  }

}
