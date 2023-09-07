import { HttpService } from './../../common/services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';

import { AppService } from '../../app.service';
import { EventNamesObject, InnovationDayFormObject } from '../../common/models/config-json';
import { EVENT_NAMES } from '../../registration/registration/models/registration-form.contants';


@Component({
  selector: 'app-registered-ideas',
  templateUrl: './registered-ideas.component.html',
  styleUrls: ['./registered-ideas.component.css']
})
export class RegisteredIdeasComponent implements OnInit, OnDestroy {

  readonly eventNames = EVENT_NAMES;

  canLoadContent: boolean = false;
  listOfEvents: Array<EventNamesObject> = [];
  registerdUsersData: Array<InnovationDayFormObject> = [];
  selectedEventName: string = null;
  isAdminUser: boolean = false;

  constructor(
    private appService: AppService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.appService.getRegisteredUserDetailsData().subscribe(data => {
      if (data && Object.keys(data).length) {
        this.initializeVariables(data);
      } else {
        this.appService.getRegisteredList().subscribe(data => {
          this.initializeVariables(data['data']);
        });
      }
    });
  }

  exportToExcel(): void {
    let dataToExport = JSON.parse(JSON.stringify(this.registerdUsersData));
    debugger
    let exportObject = [];
    dataToExport.forEach((e: InnovationDayFormObject) => {
      let data = null
      e.teamMembersDetails.forEach(email => {
        data = data && data.length ? `${data}, ${email.emailId}` : email.emailId;
      });
      e.teamMembersDetails = data;
      exportObject.push({
        'Team Name': e.teamName,
        'Team Size': e.teamSize,
        'Team Members Details': e.teamMembersDetails,
        'Submission Mode': e.submissionMode,
        'Location': e.location,
        'Gist Of Idea': e.gistOfIdea,
        'Created Date and Time': e.createdDateAndTime,
        'Last Updated Date and Time': e.lastUpdatedDateAndTime
      });
    });
    /* pass here the table id */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportObject);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, `${this.selectedEventName}_list.xlsx`);
    return;
  }

  initializeVariables(data: object): void {
    this.canLoadContent = true;
    this.listOfEvents = data['eventList'];
    this.selectedEventName = this.listOfEvents.find((e: EventNamesObject) => e.isSelected)['name'];
    this.registerdUsersData = data['regsitrationDetails'][this.selectedEventName];
    this.isAdminUser = data['isAdminUser']
    debugger
  }

  ngOnDestroy(): void {
    this.appService.setRegisteredUserDetailsData({})
  }

}
