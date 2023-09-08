import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent{


  secretKeyMisMatch: boolean;
  secretKey: any;
  inputType: string = 'password';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  onClickEye(): void {
    let inputElement = document.getElementById('secretKey') as HTMLInputElement;
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
    this.inputType = inputElement.type;
  }

  onClickOk(): void {
    this.secretKeyMisMatch = false;
    if (this.data.data.rowItem.secretKey !== this.secretKey) {
      this.secretKeyMisMatch = true;
      return;
    }
    this.dialogRef.close('ok');
  }

}
