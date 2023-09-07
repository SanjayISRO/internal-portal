import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isSelectedForm: string = 'sign_in';

  constructor(private router: Router) {}

  onClickSubmit(userForm: any): void {
    console.log('user name ->', userForm.controls['userName'].value);
    console.log('Email Id ->', userForm.controls['emailId'].value);
    console.log('CheckboxValue ->', userForm.controls['checkbox'].value);
    const obj = {
      name: userForm.controls['userName'].value,
      email: userForm.controls['emailId'].value
    }
    sessionStorage.setItem('userDetails', JSON.stringify(obj))

    this.router.navigateByUrl('/home');
  }

  canEnableBtn(): boolean {
    return false;
  }

}
