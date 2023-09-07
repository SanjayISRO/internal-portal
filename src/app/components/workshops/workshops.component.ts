import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../common/services/http.service';


@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  constructor(private httpService: HttpService) {}

  workshopLables: Array<string> = [];
  workshopData: Array<object> = [];
  selectedEventName: string = null;

  ngOnInit(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });

    this.httpService.get('workshopVideos').subscribe(data => {
      this.workshopLables = Object.keys(data['data']);
      this.workshopData = data['data'];
      this.selectedEventName = this.workshopLables[0];
    }, error => {

    });
  }
}
