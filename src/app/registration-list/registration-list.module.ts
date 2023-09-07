import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';

import { RegistrationListComponent } from './registration-list/registration-list.component';
import { RegistrationListRoutingModule } from './registration-list-routing.module';
import { ConnectWithPeopleComponent } from './registration-list/components/connect-with-people/connect-with-people.component';
import { CollaborateWithPeopleComponent } from './registration-list/components/collaborate-with-people/collaborate-with-people.component';
import { RegistrationFormComponent } from './registration-list/dialogs/registration-form/registration-form.component';
import { ConfirmDeleteComponent } from './registration-list/dialogs/confirm-delete/confirm-delete.component';
import { UserValidationComponent } from './registration-list/dialogs/user-validation/user-validation.component';
import { DetailedInfoDialogComponent } from './registration-list/dialogs/detailed-info-dialog/detailed-info-dialog.component'



@NgModule({
  declarations: [
    RegistrationListComponent,
    ConnectWithPeopleComponent,
    CollaborateWithPeopleComponent,
    RegistrationFormComponent,
    ConfirmDeleteComponent,
    UserValidationComponent,
    DetailedInfoDialogComponent
  ],
  imports: [
    CommonModule,
    RegistrationListRoutingModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSliderModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    DatePipe
  ]
})
export class RegistrationListModule { }
