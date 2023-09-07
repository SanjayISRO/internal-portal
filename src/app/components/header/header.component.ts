import { Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // @Input() subText: string = '';

  title: string = 'Genesys India Hackathon';
  idValue: string = 'title'
  selectedTab: string = '';
  isRegisterClicked: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.appService.checkFlagValue.subscribe((flagValue: boolean) => {
      this.isRegisterClicked = flagValue;
    }));

    this.router.events.subscribe(routes => {
      if (routes['url']) {
        if (routes['url'].includes('genesysindiahackathon')) {
          this.selectedTab = 'home';
        } else if (routes['url'].includes('usersList')) {
          this.selectedTab = 'usersList';
        } else if (routes['url'].includes('workshops')) {
          this.selectedTab = 'workshops';
        } else if (routes['url'].includes('faq')) {
          this.selectedTab = 'faq';
        } else if (routes['url'].includes('/')) {
          this.selectedTab = 'home';
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
  }

}
