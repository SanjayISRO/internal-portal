import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.css']
})
export class ButtonComponentComponent {

  @Input() parentFieldName: string = '';

  @Output() buttonClicked = new EventEmitter();

  onClickButton(): void {
    console.log('value passed from parent -->', this.parentFieldName);
    this.buttonClicked.emit(this.parentFieldName);
  }
}
