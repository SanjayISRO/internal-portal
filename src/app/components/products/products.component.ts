import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  isFirstBtnClicked: boolean = false;
  isSecondBtnClicked: boolean = false;
  isThirdBtnClicked: boolean = false;

  onClickButtonFromChild(value: string): void {
    console.log('value emitted by child', value);
    if (value === 'firstButton') {
      this.isFirstBtnClicked = !this.isFirstBtnClicked;
    }
    if (value === 'secondButton') {
      this.isSecondBtnClicked = !this.isSecondBtnClicked;
    }
  }
}
