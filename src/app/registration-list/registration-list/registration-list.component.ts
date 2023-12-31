import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component'
import { UsersObject } from './models/UserList';
import { AppService } from '../../app.service';
import { FileSaverService } from './services/file-saver.service';



@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {

  selectedFieldName: string = 'connect';
  searchBySkillSet: string = '';
  SearchByDepartment: string = '';
  isRegisterClicked: boolean = false;
  connectUsersList: UsersObject[] = []
  collaborateUsersList: UsersObject[] = [];
  canLoadContent: boolean = false;
  successOrErrorMessage: string = '';
  dataSavedSucessfully: boolean = false;
  emitedData: object = {};


  constructor(
    public dialog: MatDialog,
    private fileSaverService: FileSaverService,
    private appService: AppService
  ) { }


  ngOnInit(): void {
    this.appService.scrollToTop();
    this.fileSaverService.getFormData().subscribe((result: object) => {
      this.connectUsersList = result['data'].connect;
      this.collaborateUsersList = result['data'].collaborate;
      setTimeout(() => {
        this.canLoadContent = true;
      }, 1000)
    }, error => {
        this.successOrErrorMessage = error
      this.closeSuccessOrErrorMsg();
      this.canLoadContent = true;
    });
  }


  onClickEnrollNow(value: boolean): void {
    this.appService.setFlagValue(true);
    this.isRegisterClicked = true;
    const dialogRef = this.dialog.open(RegistrationFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.isRegisterClicked = false;
      this.canLoadContent = false;
      if (result && typeof result === 'object') {
        this.setValuesToVarialbles('Data saved successfully!!!', true, result.connect, result.collaborate);
      } 
      if (result && typeof result === 'string') {
        this.setValuesToVarialbles(result, false, [], []);
      }
      this.callDefaultMethods();
    });
  }

  closeSuccessOrErrorMsg(): void {
    setTimeout(() => {
      this.successOrErrorMessage = '';
    }, 3000);
  }

  setValuesToVarialbles(msg: string, falgValue: boolean, connectList: UsersObject[], collaborateList: UsersObject[]): void {
    this.successOrErrorMessage = msg;
    this.dataSavedSucessfully = falgValue;
    this.connectUsersList = connectList;
    this.collaborateUsersList = collaborateList;
  }

  onClickDeleteRow(obj: object): void {
    this.emitedData = obj;
    this.appService.setFlagValue(true);
    this.isRegisterClicked = true;
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        this.isRegisterClicked = false;
        this.callDefaultMethods();
        return;
      }
      this.isRegisterClicked = false;
      this.canLoadContent = false;
      this.fileSaverService.setRowInactive(this.emitedData).subscribe(success => {
          this.setValuesToVarialbles('Data updated successfully!!!', true, success['data'].connect, success['data'].collaborate);
          this.callDefaultMethods();
      }, error => {
          this.setValuesToVarialbles(error, false, [], []);
          this.callDefaultMethods();
      });
    });
  }

  callDefaultMethods() {
    this.appService.scrollToTop();
      setTimeout(() => {
        this.canLoadContent = true
      }, 1000);
      this.closeSuccessOrErrorMsg();
      this.appService.setFlagValue(false);
  }

}
