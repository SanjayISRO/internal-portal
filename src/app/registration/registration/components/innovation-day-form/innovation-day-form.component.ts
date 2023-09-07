import { Component, Input, OnInit, Output, EventEmitter, OnChanges, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { VALIDATION_MESSAGE } from '../../models/innovation-day-form.contants';
import { AppService } from '../../../../app.service';
import { ConfigJson } from '../../../../common/models/config-json';
import { RegistrationFormService } from '../../services/registration-form.service';
import { ValidateTeamName } from '../../models/teamName.validator'




@Component({
  selector: 'app-innovation-day-form',
  templateUrl: './innovation-day-form.component.html',
  styleUrls: ['./innovation-day-form.component.css']
})
export class InnovationDayFormComponent implements OnInit, OnChanges {

  @Input() eventName: string;
  @Output() message = new EventEmitter();
  @ViewChild('textAreaTag') textAreaTag: ElementRef<any>;

  readonly validation_message = VALIDATION_MESSAGE

  @Input() checkBoxValue: boolean;

  innovationDayRegistrationForm: FormGroup;
  maxSize: number;
  canLoadContent: boolean = true;
  listOfTeamNames: string[] = [];
  rowHeightConfig: object = {
    1: 2.5,
    2: 6,
    3: 10,
    4: 13,
    5: 17
  };
  hideBtns: boolean = false;
  createdDateAndTime: string = null;
  maxWordCount: number;
  // teamMembersDetails: FormArray;


  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private registrationFormService: RegistrationFormService,
    private datepipe: DatePipe
  ) {
    this.appService.fetchConfigData().subscribe((data: ConfigJson) => {
      this.maxSize = data.innovationDayConfigs.maxSize;
      this.maxWordCount = data.innovationDayConfigs.maxWordCount;
    });
    this.innovationDayRegistrationForm = this.fb.group({
      teamName: ['', [Validators.required, ValidateTeamName]],
      teamSize: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.maxSize)]],
      gistOfIdea: [''],
      // secretKey: ['', Validators.required],
      teamMembersDetails: this.fb.array([]),
      location: ['', Validators.required],
      submissionMode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getTeamNames(null);
    this.innovationDayRegistrationForm.controls['teamSize'].valueChanges.subscribe(value => {
      let control = this.teamMembersDetails();
      for (let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i)
      }
      if (value > 0 && value <= this.maxSize) {
        for (let i = 0; i < value; i++) {
          control.push(this.newTeamMemberDetail())
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetForm();
    this.checkBoxValue = changes['checkBoxValue'].currentValue;
    this.hideBtns = this.checkBoxValue;
    if (this.checkBoxValue) {
      this.innovationDayRegistrationForm.controls['teamName'].clearValidators();
    } else if (!this.checkBoxValue) {
      this.innovationDayRegistrationForm.controls['teamName'].setValidators([Validators.required, ValidateTeamName]);
    }
    this.innovationDayRegistrationForm.updateValueAndValidity();
  }

  teamMembersDetails(): FormArray {
    return this.innovationDayRegistrationForm.get('teamMembersDetails') as FormArray
  }

  newTeamMemberDetail(): FormGroup {
    return this.fb.group({
      // name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]]
    })
  }

  teamMembersDetailsCon(index) {
    return this.teamMembersDetails().controls[index] as FormGroup;
  }

  onClickCancel(): void {
    this.resetForm();
    this.innovationDayRegistrationForm.updateValueAndValidity();
    this.hideBtns = !!this.checkBoxValue;
  }

  onClickSubmit(): void {
    const methodName = this.checkBoxValue ? 'saveEditedFormData' : 'saveFormData';
    let httpCallType: string = null;
    this.canLoadContent = false;
    const obj = {};
    if (methodName === 'saveFormData') {
      obj['createdDateAndTime'] = this.datepipe.transform((new Date), 'dd/MM/yyyy h:mm:ss'),
      obj['lastUpdatedDateAndTime'] = this.datepipe.transform((new Date), 'dd/MM/yyyy h:mm:ss');
      httpCallType = 'post'
    } else if (methodName === 'saveEditedFormData') {
      obj['createdDateAndTime'] = this.createdDateAndTime,
      obj['lastUpdatedDateAndTime'] = this.datepipe.transform((new Date), 'dd/MM/yyyy h:mm:ss');
      httpCallType = 'put'
    }
    const currentDateTime =this.datepipe.transform((new Date), 'dd/MM/yyyy h:mm:ss');
    this.registrationFormService.saveFormData(this.innovationDayRegistrationForm.value, this.eventName, obj, httpCallType , methodName).subscribe(success => {
       this.getTeamNames("Data Saved SuccessFully");
      // this.closeLoaderModal('Data Saved SuccessFully', true);
      this.resetForm();
    }, error => {
      this.closeLoaderModal(error, false);
    })
  }

  closeLoaderModal(message: string, status: boolean): void {
    const obj = {
      message: message,
      flag: status
    }
    setTimeout(() => {
      this.canLoadContent = true;
      this.message.emit(obj);
    }, 2000)
  }


  getTeamNames(message: string): void {
    this.registrationFormService.getTeamNames(this.eventName).subscribe(success => {
      this.listOfTeamNames = success.data;
      sessionStorage.setItem('listOfTeamNames', JSON.stringify(success.data));
      this.closeLoaderModal(message, !!message);
    }, error => {
      this.closeLoaderModal(error, false);
    });
  }

  onClickSubmitEditDetails(): void {
    this.registrationFormService.getEditDetails(this.innovationDayRegistrationForm.value, this.eventName).subscribe(success => {
      if (success.message === 'success') {
        this.innovationDayRegistrationForm.setValue({
          teamName: success.data['teamName'],
          teamSize: success.data['teamSize'],
          secretKey: success.data['secretKey'],
          teamMembersDetails: success.data['teamMembersDetails'],
          gistOfIdea: success.data['gistOfIdea'],
          location: success.data['location']
        });
        this.createdDateAndTime = success.data['createdDateAndTime'];
        this.hideBtns = false
      }
      if (success.message === 'error') {
        this.closeLoaderModal(success['data'], false);
      }
    }, error => {
      this.closeLoaderModal(error, false);
    });
  }

  resetForm(): void {
    this.innovationDayRegistrationForm.reset();
    Object.values(this.innovationDayRegistrationForm.controls).forEach(controls => {
      controls.setErrors(null);
    })
  }

}
