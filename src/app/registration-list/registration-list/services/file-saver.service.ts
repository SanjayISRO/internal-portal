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

  getFilteredValues(listOfData: UsersObject[], searchValue: string, from: string): UsersObject[] {
    if (!searchValue) {
      return listOfData;
    }
    let tempArray: UsersObject[] = [];
    listOfData.forEach((e: UsersObject) => {
      if (e.skillSet.filter((skill: string) => skill.toLowerCase().includes(searchValue.toLowerCase())).length) {
        tempArray.push(e);
      }
      // switch (from) {
      //   case 'connect': 
      //   if (e.title.toLowerCase().includes(searchValue)) {
      //     tempArray.push(e)
      //   }
      //   break;
      //   case 'collaborate':
      //     if (e.skillSet.filter((skill: string) => skill.toLowerCase().includes(searchValue.toLowerCase())).length) {
      //       tempArray.push(e);
      //     }
      //     break;
      // }
    });
    return tempArray;
  }

  saveFormData(form: FormGroup): Observable<object> {
    let isConnect = form.controls['contributionSelection'].value.toLowerCase() === 'connect';
    const reqBody = {
      'category': form.controls['contributionSelection'].value.toLowerCase(),
      'details': {
        'name': form.controls['userName'].value,
        'email': form.controls['email'].value,
        'department': form.controls['department'].value === 'Others' ? form.controls['otherDepartmentName'].value :
          form.controls['department'].value,
        'skillSet': isConnect ?
         form.controls['keywordsOrKeyReq'].value : form.controls['skillSetForCollaborate'].value,
         'isActive': true,
         'id': null,
         'genPlatform': form.controls['genPlatform'].value,
         'secretKey': form.controls['secretKey'].value,
         'title': isConnect ? form.controls['title'].value : undefined,
         'problemStatement': isConnect ? form.controls['problemStatement'].value : undefined,
         'status': isConnect ? 'Open' : undefined,
         'teamMembersList': isConnect ? [] : undefined,
         'createdDateAndTime': form.controls['createdDateAndTime'].value,
         'lastModifiedDateAndTime': form.controls['createdDateAndTime'].value,
        //  'priorityLevel': isConnect ? form.controls['priorityLevel'].value : undefined,

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

  updateEditDataForConnect(postObject: object): Observable<object> {
    return this.httpService.put('saveDataForConnectEdit', postObject);
  }
}
