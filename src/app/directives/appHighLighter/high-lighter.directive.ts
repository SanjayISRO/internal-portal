import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighLighter]'
})
export class HighLighterDirective {

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.color = '#374f74';
    this.el.nativeElement.style.fontSize = '25px';
    this.el.nativeElement.style.fontWeight = 'bolder';
  }

}
