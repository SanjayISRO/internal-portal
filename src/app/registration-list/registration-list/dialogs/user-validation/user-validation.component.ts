import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-validation',
  templateUrl: './user-validation.component.html',
  styleUrls: ['./user-validation.component.css']
})
export class UserValidationComponent implements OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<UserValidationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    secretKey: string;
  secretKeyMisMatch: boolean;

  onClickSubmit() {
    if (this.data.value.secretKey === this.secretKey) {
      this.dialogRef.close('submit');
    } else {
      this.secretKeyMisMatch = true;
    }
  }

  onClickEye(): void {
    let inputElement = document.getElementById('secretKey') as HTMLInputElement;
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }

  ngOnDestroy(): void {
      this.secretKeyMisMatch = false;
  }

}
