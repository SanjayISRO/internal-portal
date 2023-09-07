import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UsersObject } from '../../models/UserList';
import { FileSaverService } from '../../services/file-saver.service'


@Component({
  selector: 'app-collaborate-with-people',
  templateUrl: './collaborate-with-people.component.html',
  styleUrls: ['./collaborate-with-people.component.css']
})
export class CollaborateWithPeopleComponent implements OnChanges {

  @Input() collaborateUsersList: UsersObject[] = [];
  @Output() enrollNow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  
  searchBySkillSet: string = '';
  filteredResults: UsersObject[] = this.collaborateUsersList;

  constructor(private fileSaverService: FileSaverService) {}

  ngOnInit(): void {
    this.searchBySkillSet = '';
  }
  
  filterItem(modelValue: string): void {
    this.filteredResults = this.fileSaverService.getFilteredValues(this.collaborateUsersList, modelValue, 'collaborate');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredResults = changes['collaborateUsersList'].currentValue;
  }

  onClickEnrollNow(): void {
    this.enrollNow.emit('collaborate')
  }

  onClickDelete(rowItem: UsersObject): void {
    const obj = {
      category: 'collaborate',
      rowItem: rowItem
    }
    this.deleteRow.emit(obj);
  }

}
