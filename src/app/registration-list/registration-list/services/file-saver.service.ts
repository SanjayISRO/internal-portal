import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../common/services/http.service';
import { UsersObject } from '../models/UserList';

@Injectable({
  providedIn: 'root'
})

export class FileSaverService {

  constructor(private httpService: HttpService) { }

  getFilteredValues(listOfData: UsersObject[], searchValue: string): UsersObject[] {
    if (!searchValue) {
      return listOfData;
    }
    let tempArray: UsersObject[] = [];
    listOfData.forEach((e: UsersObject) => {
      if (e.skillSet.filter((skill: string) => skill.toLowerCase().includes(searchValue.toLowerCase())).length) {
        tempArray.push(e);
      }
    });
    return tempArray;
  }

  saveFormData(form: FormGroup): Observable<object> {
    const reqBody = {
      'category': form.controls['contributionSelection'].value.toLowerCase(),
      'details': {
        'name': form.controls['userName'].value,
        'email': form.controls['email'].value,
        'department': form.controls['department'].value === 'Others' ? form.controls['otherDepartmentName'].value :
          form.controls['department'].value,
        'skillSet': form.controls['contributionSelection'].value.toLowerCase() === 'connect' ?
         form.controls['skillSetForConnect'].value : form.controls['skillSetForCollaborate'].value,
         'isActive': true,
         'id': null,
         'genPlatform': form.controls['genPlatform'].value
      }
    }
    return this.httpService.post('saveUserData', reqBody);
  }

  getFormData(): Observable<object> {
    return this.httpService.get('getUsersList');
  }

  setRowInactive(emitedData: object): Observable<object> {
    const reqBody = {
      rowId: emitedData['rowItem']['id'],
      category: emitedData['category']
    }
    return this.httpService.put('deleteUser', reqBody);
  }
}
