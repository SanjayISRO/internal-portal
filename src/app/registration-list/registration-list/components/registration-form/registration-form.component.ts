import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';

import { UsersList } from '../../models/UserList'
import { FileSaverService } from './../../services/file-saver.service';
import { DepartNames, ContributionTypes, GenesysPlatforms } from './../../models/registration-form.constants';

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
export class RegistrationFormComponent implements OnInit {

  userRegistrationForm: FormGroup;
  listOfDepartments: string[] = DepartNames;
  contributionList: object[] = ContributionTypes;
  genesysPlatformsList: string[] = GenesysPlatforms

  constructor(
    private fileSaverService: FileSaverService,
    public dialogRef: MatDialogRef<RegistrationFormComponent>,) {

    this.userRegistrationForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', Validators.required),
      contributionSelection: new FormControl('', Validators.required),
      skillSetForConnect: new FormControl([], Validators.required),
      otherDepartmentName: new FormControl(''),
      skillSetForCollaborate: new FormControl([], Validators.required),
      genPlatform: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
    this.userRegistrationForm.controls['contributionSelection'].valueChanges.subscribe(value => {
      if (value === 'Connect') {
        this.userRegistrationForm.controls['skillSetForCollaborate'].clearValidators();
        this.userRegistrationForm.controls['skillSetForConnect'].setValidators(Validators.required);
      } else {
        this.userRegistrationForm.controls['skillSetForConnect'].clearValidators();
        this.userRegistrationForm.controls['skillSetForCollaborate'].setValidators(Validators.required);
      }
      ['skillSetForConnect', 'skillSetForCollaborate'].forEach((formControlName: string) => this.userRegistrationForm.controls[formControlName].updateValueAndValidity())
    });

    this.userRegistrationForm.controls['department'].valueChanges.subscribe(value => {
      if (value === 'Others') {
        this.userRegistrationForm.controls['otherDepartmentName'].setValidators(Validators.required);
      } else {
        this.userRegistrationForm.controls['otherDepartmentName'].clearValidators();
      }
      this.userRegistrationForm.controls['otherDepartmentName'].updateValueAndValidity();
    });
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
    console.log(this.userRegistrationForm);
    this.fileSaverService.saveFormData(this.userRegistrationForm).subscribe((result: ResponseObj) => {
      this.dialogRef.close(result.data);
    }, err => {
      debugger;
      this.dialogRef.close(err);
    });
  }
}
