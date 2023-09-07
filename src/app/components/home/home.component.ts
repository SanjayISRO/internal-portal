import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';



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
export class HomeComponent  {

  listOfObjectives: Array<Obejectives> = [
    {key: 'Connect', info: 'with your peers.'},
    {key: 'Collaborate', info: 'on mind-blowing futuristic ideas for our industry-leading Genesys Cloud platform.'},
    {key: 'Create', info: 'a working proof-of-concept for the jury.'},
    {key: 'Conquer', info: 'our goals for FY24 as One Genesys!'},
  ];

  listOfNumbers: Array<number> = [100, 200, 3000, 4000];

  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

}
