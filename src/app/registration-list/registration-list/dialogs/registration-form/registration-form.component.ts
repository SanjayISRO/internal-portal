import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsersList } from '../../models/UserList'
import { FileSaverService } from '../../services/file-saver.service';
import { DepartNames, ContributionTypes, GenesysPlatforms, Prioritylist } from '../../models/registration-form.constants';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

interface ResponseObj {
  status: number;
  data: Array<UsersList>,
  message: string;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit, OnDestroy {

  userRegistrationForm: FormGroup;
  listOfDepartments: string[] = DepartNames;
  contributionList: object[] = ContributionTypes;
  genesysPlatformsList: string[] = GenesysPlatforms;
  subscriptions: Subscription[] = [];
  showForm: boolean;
  priorityList: string[] = Prioritylist;

  constructor(
    private fileSaverService: FileSaverService,
    public dialogRef: MatDialogRef<RegistrationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe) {


    this.userRegistrationForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', Validators.required),
      contributionSelection: new FormControl('', Validators.required),
      keywordsOrKeyReq: new FormControl([], Validators.required),
      otherDepartmentName: new FormControl(''),
      skillSetForCollaborate: new FormControl([], Validators.required),
      genPlatform: new FormControl('', Validators.required),
      secretKey: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      problemStatement: new FormControl('', Validators.required),
      createdDateAndTime: new FormControl(this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss')),
      // priorityLevel: new FormControl('')
    });

  }

  ngOnInit(): void {
    this.userRegistrationForm.controls['contributionSelection'].patchValue(this.data.option);
    if (this.data.option.toLowerCase() === 'connect') {
      this.userRegistrationForm.controls['skillSetForCollaborate'].clearValidators();
      // this.userRegistrationForm.controls['priorityLevel'].setValidators(Validators.required);
      this.updateDateValidation(['skillSetForCollaborate']);
    }
    if (this.data.option.toLowerCase() === 'collaborate') {
      ['problemStatement', 'title', 'secretKey', 'keywordsOrKeyReq'].forEach((e: string) => {
        this.userRegistrationForm.controls[e].clearValidators();
        this.userRegistrationForm.controls[e].updateValueAndValidity();
      });
    }
    this.subscriptions.push(this.userRegistrationForm.controls['department'].valueChanges.subscribe(value => {
      if (value === 'Others') {
        this.userRegistrationForm.controls['otherDepartmentName'].setValidators(Validators.required);
      } else {
        this.userRegistrationForm.controls['otherDepartmentName'].clearValidators();
      }
      this.updateDateValidation(['otherDepartmentName']);
    }));
    // this.showForm = true;
  }

  add(event: MatChipInputEvent, formControlName: string): void {
    const value2 = (event.value || '').trim();
    if (value2) {
      this.userRegistrationForm.controls[formControlName].value.push(value2);
    }
    event.chipInput!.clear();
  }

  removeKeyword(keyword: string, formControlName: string): void {
    const index = this.userRegistrationForm.controls[formControlName].value.indexOf(keyword);
    if (index >= 0) {
      this.userRegistrationForm.controls[formControlName].value.splice(index, 1);
    }
  }

  onClickSubmit(): void {
    this.subscriptions.push(
      this.fileSaverService.saveFormData(this.userRegistrationForm).subscribe((result: ResponseObj) => {
        this.dialogRef.close(result.data);
      }, err => {
        this.dialogRef.close(err);
      }));
  }

  updateDateValidation(formControlNames: String[]): void {
    formControlNames.forEach((e: string) => {
      this.userRegistrationForm.controls[e].updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
