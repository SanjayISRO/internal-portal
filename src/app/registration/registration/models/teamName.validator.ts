import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateTeamName(control: AbstractControl): { [key: string]: boolean } | null {
  let value = control.value;
  const teamNames = JSON.parse(sessionStorage.getItem('listOfTeamNames'))
  let isPresent = false;
  if (teamNames && value) {
    teamNames.forEach(name => {
      if (name.toLowerCase() === value.toLowerCase()) {
        isPresent = true
      }
    });
    return isPresent ? { 'nameExists': true } : null;
  }
  return null;
}