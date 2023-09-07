import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyValue'
})
export class CurrencyValuePipe implements PipeTransform {


  transform(value: number, arg: string): string {
    let tempValue: string = ''
    if (arg === 'IN') {
      tempValue = `Rs. ${value}`
    } else if (arg === 'US') {
      tempValue = `$ ${value}`
    }
    return tempValue;
  }

}
