import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TeamMemberDetail } from './../../models/UserList';
import { DepartNames, GenesysPlatforms, Prioritylist } from '../../models/registration-form.constants';
import { FileSaverService } from '../../services/file-saver.service';

interface ChangeLogObject {
  date: string;
  value: Array<ChangeLogValue>
}

interface ChangeLogValue {
  fieldName: string;
  initialValue: any;
  changedValue: any
}

@Component({
  selector: 'app-detailed-info-dialog',
  templateUrl: './detailed-info-dialog.component.html',
  styleUrls: ['./detailed-info-dialog.component.css']
})
export class DetailedInfoDialogComponent implements OnInit, OnDestroy {

  selectedStatus: string;
  listofStatus: string[] = ['Open', 'In progress', 'Closed'];
  listOfKeywords: string[] = [];
  textContent: string;
  listOfTeamMembers: TeamMemberDetail[] = [];
  genesysPlatformsList: string[] = GenesysPlatforms;
  listOfDepartments: string[] = DepartNames;
  enableSaveBtn: boolean = true;
  initialValue: any;
  showLogs: boolean;
  logData: Array<ChangeLogObject> = [];
  selectedPriority: string;
  priorityList: string[] = Prioritylist;

  constructor(
    public dialogRef: MatDialogRef<DetailedInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private fileSaverService: FileSaverService,
  ) { }

  ngOnInit(): void {
    this.initialValue = JSON.parse(JSON.stringify(this.data.value));
    this.selectedStatus = this.data.value.status;
    this.listOfKeywords = JSON.parse(JSON.stringify(this.data.value.skillSet));
    this.textContent = this.data.value.problemStatement;
    this.listOfTeamMembers = this.data.value.teamMembersList;
    this.selectedPriority = this.data.value.priorityLevel;
    if (this.data.value.changeLog) {
      for (let date in this.data.value.changeLog) {
        this.logData.push({
          date: date,
          value: this.data.value.changeLog[date]
        })
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const value2 = (event.value || '').trim();
    if (value2) {
      this.listOfKeywords.push(value2)
    }
    event.chipInput!.clear();
  }

  removeKeyword(keyword: string): void {
    const index = this.listOfKeywords.indexOf(keyword);
    if (index >= 0) {
      this.listOfKeywords.splice(index, 1);
    }
  }

  onClickSave(): void {
    let changedData = this.compareChanges();
    if (!changedData || !changedData.length) {
      this.dialogRef.close('close');
      return;
    }
    let date = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const object = {
      details: {
        teamMembersList: this.listOfTeamMembers,
        skillSet: this.listOfKeywords,
        status: this.selectedStatus,
        problemStatement: this.textContent,
        lastModifiedDateAndTime: this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss'),
        // priorityLevel: this.selectedPriority,
      },
      id: this.data.value.id
    }
    object.details['changeLog'] = {};
    if (this.initialValue.changeLog) {
      object.details['changeLog'] = this.initialValue.changeLog;
      object.details['changeLog'][date] = object.details['changeLog'][date] ? [...changedData, ...this.initialValue.changeLog[date]] : changedData;
    } else {
      object.details['changeLog'][date] = changedData;
    }

    this.fileSaverService.updateEditDataForConnect(object).subscribe({
      next: (result: any) => {
        this.dialogRef.close(result.data);
      },
      error: (error: HttpErrorResponse) => {
        this.dialogRef.close(error);
      }
    })
  }

  onClickClose(): void {
    this.dialogRef.close('close');
  }

  onClickTrash(index: number): void {
    this.listOfTeamMembers.splice(index, 1)
    this.canEnableSaveBtn();
  }

  onClickAddMembers(): void {
    this.listOfTeamMembers.push({
      name: null,
      genPlatform: null,
      department: null,
      email: null
    });
    this.canEnableSaveBtn();
  }

  canEnableSaveBtn(): void {
    this.enableSaveBtn = true;
    for (let member of this.listOfTeamMembers) {
      if (!member.name || !member.genPlatform || !member.department) {
        this.enableSaveBtn = false;
      }
    }
  }

  compareChanges(): Array<any> {
    const tempArray = [];
    if (this.initialValue.status !== this.selectedStatus) {
      tempArray.push(this.returnChangeLogobject('Status', this.initialValue.status, this.selectedStatus));
    }
    if (this.initialValue.problemStatement !== this.textContent) {
      tempArray.push(this.returnChangeLogobject('Problem Statement', this.initialValue.problemStatement, this.textContent));
    }
    const diffForSkillSet = this.getDiffForArray(this.initialValue.skillSet, this.listOfKeywords, 'stringArray');
    if (diffForSkillSet['fromInitialValue'].length || diffForSkillSet['fromCurrentValue'].length) {
      tempArray.push(this.returnChangeLogobject('Keywords', diffForSkillSet['fromInitialValue'], diffForSkillSet['fromCurrentValue']));
    }
    const diffForTeamMembers = this.getDiffForArray(this.initialValue.teamMembersList, this.listOfTeamMembers, 'objectArray');
    if (diffForTeamMembers['fromInitialValue'].length || diffForTeamMembers['fromCurrentValue'].length) {
      tempArray.push(this.returnChangeLogobject('Team Members', diffForTeamMembers['fromInitialValue'], diffForTeamMembers['fromCurrentValue']));
    }
    if (this.selectedPriority !== this.initialValue.priorityLevel) {
      tempArray.push(this.returnChangeLogobject('Priority', this.initialValue.priorityLevel, this.selectedPriority));

    }
    return tempArray.length ? tempArray : []
  }

  getDiffForArray(initialValue: Array<any>, currentValue: Array<any>, type: string): object {
    const obj = [], diff = [];
    switch (type) {
      case 'stringArray':
        for (let data of initialValue) {
          obj[data] = this.returnFrom('initialValue');
        }
        for (let data of currentValue) {
          obj[data] ? delete obj[data] : obj[data] = this.returnFrom('changedValue');
        }
        break;
      case 'objectArray':
        for (let data of initialValue) {
          obj[data.email] = this.returnFrom('initialValue');
        }
        for (let data of currentValue) {
          obj[data.email] ? delete obj[data.email] : obj[data.email] = this.returnFrom('changedValue');
        }
        break;
    }

    const object = {
      fromInitialValue: [],
      fromCurrentValue: []
    }

    for (let data in obj) {
      obj[data].from === 'initialValue' ? object['fromInitialValue'].push(data) : object['fromCurrentValue'].push(data)
    }
    return object;
  }

  returnChangeLogobject(fieldName: string, initialValue: any, changedValue: any): object {
    return {
      fieldName: fieldName,
      initialValue: initialValue,
      changedValue: changedValue,
    }
  }

  returnFrom(from: string): object {
    return {
      from: from
    };
  }

  ngOnDestroy(): void {
    this.listOfKeywords = [];
    this.textContent = null;
  }
}
