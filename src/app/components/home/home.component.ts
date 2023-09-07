import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { AppService } from './../../app.service';
import { EventNamesObject } from '../../common/models/config-json'

interface Obejectives {
  key: string;
  info: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    // { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }
    NgbCarouselConfig
  ]
})
export class HomeComponent {

  userName: string = null;
  password: string = null;
  bsModalRef?: BsModalRef;
  listOfEvents: Array<EventNamesObject>;

  listOfObjectives: Array<Obejectives> = [
    { key: 'Connect', info: 'with your peers.' },
    { key: 'Collaborate', info: 'on mind-blowing futuristic ideas for our industry-leading Genesys Cloud platform.' },
    { key: 'Create', info: 'a working proof-of-concept for the jury.' },
    { key: 'Conquer', info: 'our goals for FY24 as One Genesys!' },
  ];

  config: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    animated: true,
    ignoreBackdropClick: true,
  }

  config2: ModalOptions = {
    class: 'modal-md',
    backdrop: 'static',
    keyboard: false,
    animated: true,
    ignoreBackdropClick: true,
  }

  errorMessage: string = null;
  listOfNumbers: Array<number> = [100, 200, 3000, 4000];

  constructor(
    config: NgbCarouselConfig,
    private modalService: BsModalService,
    private appService: AppService) {
    config.interval = 3000;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  onClickAdminBtn(modalTemplate: TemplateRef<any>): void {
    console.log(typeof modalTemplate)
    this.bsModalRef = this.modalService.show(modalTemplate, this.config);
  }

  onClickSubmit(): void {
    this.appService.validateUsers(this.userName, this.password).subscribe(success => {
      if (success['message'] === 'error') {
        this.errorMessage = success['data'];
        return;
      }
      this.bsModalRef.hide();
      this.userName = null;
      this.password = null;
      this.appService.setRegisteredUserDetailsData(success['data']);
    }, error => { })
  }

}
