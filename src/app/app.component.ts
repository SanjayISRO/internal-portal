import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  successOrErrorMessage: string = null;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getConfigData().subscribe(success => {
      this.appService.setConfigData(success['data']);
    }, error => {
      this.appService.setConfigData(error)
    })
  }

}
