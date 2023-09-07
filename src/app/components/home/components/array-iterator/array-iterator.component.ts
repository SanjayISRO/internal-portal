import { Component, Input } from '@angular/core';

interface Obejectives {
  key: string;
  info: string
}

@Component({
  selector: 'app-array-iterator',
  templateUrl: './array-iterator.component.html',
  styleUrls: ['./array-iterator.component.css'],
})
export class ArrayIteratorComponent {



  @Input() listOfObjectives: Array<Obejectives> = [];

}
